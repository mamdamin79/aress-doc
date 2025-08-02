import puppeteer, { Browser } from 'puppeteer';
import { config } from './config';

let browser: Browser | null = null;

export async function getBrowser(): Promise<Browser> {
  if (browser?.connected) return browser;

  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    defaultViewport: {
      width: config.VIEWPORT_WIDTH,
      height: config.VIEWPORT_HEIGHT,
    },
  });

  return browser;
}

export async function closeBrowser() {
  if (browser) {
    await browser.close();
    browser = null;
  }
}
