import dotenv from 'dotenv';

dotenv.config();

export const config = {
  PORT: Number(process.env.PORT) || 4000,
  VIEWPORT_WIDTH: Number(process.env.VIEWPORT_WIDTH) || 616,
  VIEWPORT_HEIGHT: Number(process.env.VIEWPORT_HEIGHT) || 336,
  APP_URL: process.env.APP_URL || 'http://localhost:3000',
  UPLOAD_URL: process.env.UPLOAD_URL || 'http://185.236.36.153:8000',
};
