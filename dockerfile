FROM n8nio/n8n:latest
USER root

ENV NODE_ENV=development

RUN npm install -g typescript gulp rimraf

COPY . .

RUN npm install && \
  npm run build && \
  ls -la dist/

USER node
