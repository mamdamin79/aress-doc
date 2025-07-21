import express from 'express';
import puppeteer, { Browser, Page } from 'puppeteer';
import { setTimeout } from 'node:timers/promises';
import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
// recreate __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const OUTPUT_DIR = path.resolve(__dirname, './output');
const app = express();
app.use(express.json());

// Config via env or fallback
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const VIEWPORT_WIDTH = process.env.VIEWPORT_WIDTH
  ? Number(process.env.VIEWPORT_WIDTH)
  : 616;
const VIEWPORT_HEIGHT = process.env.VIEWPORT_HEIGHT
  ? Number(process.env.VIEWPORT_HEIGHT)
  : 336;
const APP_URL = process.env.APP_URL ?? 'http://localhost:3000';
fs.mkdirSync(OUTPUT_DIR, { recursive: true });

app.use('/output', express.static(OUTPUT_DIR));

let browser: Browser | null = null;

// Launch browser singleton to reuse between requests
async function getBrowser(): Promise<Browser> {
  if (browser && browser.connected) {
    return browser;
  }
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: {
      width: VIEWPORT_WIDTH,
      height: VIEWPORT_HEIGHT,
    },
  });
  return browser;
}

// Graceful shutdown
async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
  }
}

process.on('SIGINT', async () => {
  console.log('SIGINT received, closing browser...');
  await closeBrowser();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('SIGTERM received, closing browser...');
  await closeBrowser();
  process.exit(0);
});

app.post('/render', async (req, res) => {
  const startTime = Date.now();
  const { id, title, selectedFilters } = req.body;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: '`id` must be a string' });
  }

  // Ensure selectedFilters is an object if provided
  const filters =
    selectedFilters && typeof selectedFilters === 'object'
      ? selectedFilters
      : {};

  // Convert filters object into query string
  const queryString = new URLSearchParams(filters).toString();
  const renderUrl = `${APP_URL}/render/${encodeURIComponent(id)}/${encodeURIComponent(title ?? 'گزارش')}?${queryString}`;

  try {
    const fileName = `chart-${Date.now()}.png`;
    const outputPath = path.join(OUTPUT_DIR, fileName);

    const browserInstance = await getBrowser();
    const page: Page = await browserInstance.newPage();

    await page.setViewport({ width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT });

    console.log(`[${new Date().toISOString()}] Navigating to ${renderUrl}`);
    await page.goto(renderUrl, {
      waitUntil: 'networkidle2',
      timeout: 30000,
    });

    await setTimeout(1000);

    const buffer = await page.screenshot({
      type: 'png',
      omitBackground: true,
    });

    fs.writeFileSync(outputPath, buffer);
    await page.close();

    const duration = (Date.now() - startTime) / 1000;

    console.log(
      `[${new Date().toISOString()}] Rendered ${fileName} in ${duration}s`,
    );

    res.json({ imageUrl: `/output/${fileName}` });
  } catch (err) {
    console.error(`[${new Date().toISOString()}] Render failed`, err);
    res.status(500).json({
      error: 'Render failed',
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

app.listen(PORT, () => {
  console.log(`App is running smoothly.`);
});
