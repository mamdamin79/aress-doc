import express from 'express';
import fetch from 'node-fetch';
import FormData from 'form-data';
import { setTimeout as delay } from 'node:timers/promises';
import { getBrowser, closeBrowser } from './browser.js';
import { config } from './config.js';
import { log, logError } from './utils/logger.js';
import { z } from 'zod';
import { URL, URLSearchParams } from 'url';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// graceful shutdown
for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, async () => {
    log(`${signal} received. Cleaning up...`);
    await closeBrowser();
    process.exit(0);
  });
}

// Zod validation schema
const renderSchema = z.object({
  id: z.string(),
  title: z.string().optional(),
  selectedFilters: z.record(z.string(), z.string()).optional(),
});

app.post('/render', async (req, res) => {
  const startTime = Date.now();

  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Bearer token required' });
  }
  const bearerToken = authHeader.slice(7);

  const parseResult = renderSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      error: 'Invalid request body',
      issues: parseResult.error.issues,
    });
  }

  const { id, title = 'گزارش', selectedFilters = {} } = parseResult.data;

  try {
    const queryString = new URLSearchParams(selectedFilters).toString();
    const renderUrl = `${config.APP_URL}/render/${encodeURIComponent(id)}/${encodeURIComponent(title)}?${queryString}`;
    const urlObj = new URL(renderUrl);

    const browser = await getBrowser();
    const page = await browser.newPage();
    await page.setViewport({
      width: config.VIEWPORT_WIDTH,
      height: config.VIEWPORT_HEIGHT,
    });

    log(`Navigating to ${renderUrl}`);
    await page.setCookie({
      name: 'access_token',
      value: bearerToken,
      domain: urlObj.hostname,
      path: '/',
      httpOnly: true,
      secure: urlObj.protocol === 'https:',
    });

    await page.goto(renderUrl, { waitUntil: 'networkidle2', timeout: 30000 });
    await delay(1000);

    const buffer = await page.screenshot({ type: 'png', omitBackground: true });
    await page.close();

    // Upload the image
    const formData = new FormData();
    formData.append('file', buffer, {
      filename: `chart-${Date.now()}.png`,
      contentType: 'image/png',
    });

    formData.append('selected_filters', JSON.stringify(selectedFilters));

    const uploadRes = await fetch(
      `${config.UPLOAD_URL}/reports/${id}/screenshot`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${bearerToken}`,
          ...formData.getHeaders(),
        },
        body: formData,
      },
    );

    if (!uploadRes.ok) {
      if (uploadRes.status === 401)
        return res.status(401).json({ error: 'Unauthorized' });
      throw new Error(`Upload failed with status ${uploadRes.status}`);
    }

    const uploadResult = await uploadRes.json();
    const duration = (Date.now() - startTime) / 1000;
    log(`Rendered and uploaded in ${duration}s`);

    res.json({ uploadResult });
  } catch (err) {
    logError('Render failed:', err);
    res.status(500).json({
      error: 'Render failed',
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(config.PORT, () => {
  log(`Server listening on port ${config.PORT}`);
});
