FROM node:fermium-alpine
WORKDIR /usr/src/app

# Override the base log level (info).
ENV NPM_CONFIG_LOGLEVEL warn

# Install npm dependencies first (so they may be cached if dependencies don't change)
COPY package.json package.json
COPY packages/api/tsconfig.json packages/api/tsconfig.json
COPY packages/api/package.json packages/api/package.json
COPY yarn.lock yarn.lock
RUN yarn install --production

# Copy package source
COPY --from=webhook-mediator-build packages/api/build packages/api/build

EXPOSE 4545
WORKDIR /usr/src/app/packages/api

CMD yarn start:prod
