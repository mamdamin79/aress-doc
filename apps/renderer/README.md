# Renderer App

A Node.js application that renders web pages to images using Puppeteer and uploads them to a specified endpoint.

## Features

- Web page rendering using Puppeteer
- Image screenshot generation
- File upload to external services
- Bearer token authentication
- Health check endpoint
- Docker support

## Environment Variables

- `PORT` - Server port (default: 4000)
- `VIEWPORT_WIDTH` - Browser viewport width (default: 616)
- `VIEWPORT_HEIGHT` - Browser viewport height (default: 336)
- `APP_URL` - Target application URL for rendering (default: http://localhost:3000)
- `UPLOAD_URL` - Upload service URL (default: http://185.236.36.153:8000)

## Docker Usage

### Building the Docker Image

```bash
docker build -t renderer-app .
```

### Running the Container

```bash
docker run -d \
  --name renderer \
  -p 4000:4000 \
  -e APP_URL=http://your-app-url \
  -e UPLOAD_URL=http://your-upload-url \
  renderer-app
```

### Using Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'
services:
  renderer:
    build: .
    ports:
      - "4000:4000"
    environment:
      - APP_URL=http://your-app-url
      - UPLOAD_URL=http://your-upload-url
      - PORT=4000
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:4000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) }).on('error', () => process.exit(1))"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

Then run:

```bash
docker-compose up -d
```

## API Endpoints

### POST /render

Renders a web page and uploads the screenshot.

**Headers:**
- `Authorization: Bearer <token>`
- `Content-Type: application/json`

**Body:**
```json
{
  "id": "report-id",
  "title": "Report Title",
  "selectedFilters": {
    "filter1": "value1",
    "filter2": "value2"
  }
}
```

### GET /health

Health check endpoint that returns server status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Development

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Security Notes

- The Docker container runs as a non-root user for security
- Puppeteer is configured with `--no-sandbox` and `--disable-setuid-sandbox` for container compatibility
- Bearer token authentication is required for all render requests