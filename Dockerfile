FROM node:23.9.0-slim

WORKDIR /app

RUN npm install -g pnpm 
RUN npm add --global nx@19.6.5
RUN npm install http-server

COPY package.json pnpm-lock.yaml /app/   

RUN cd /app

RUN pnpm install --frozen-lockfile

COPY . /app/

RUN nx run design-system:build-storybook --disable-telemetry

# EXPOSE 6009
# CMD ["npx", "http-server", "./libs/design-system/storybook-static", "-p", "6009"]
# docker build  -t design-system-storybook .
# docker run -p 6009:6009 design-system-storybook