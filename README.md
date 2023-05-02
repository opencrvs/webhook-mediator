# webhook-mediator

Example Docker Compose config:

```
 webhook-mediator:
    image: opencrvs/webhook-mediator:<your-git-hash>
    build:
      context: .
      dockerfile: ./packages/api/Dockerfile
    restart: unless-stopped
    environment:
      - NODE_ENV=development
      - WEBHOOK_URL=http://webhook-mediator:4545/webhooks
      - AUTH_URL=http://auth:4040
      - CALLBACK_URL=http://webhook-mediator:4545/webhooks
      - SHA_SECRET_PATH=/run/secrets/sha-secret
      - CLIENT_SECRET_PATH=/run/secrets/client-secret
      - CLIENT_ID_PATH=/run/secrets/client-id
    secrets:
      - jwt-public-key.{{ts}}
      - sha-secret
      - client-secret
      - client-id
    deploy:
      labels:
        - 'traefik.enable=true'
        - 'traefik.http.routers.webhook-mediator.rule=Host(`webhook-mediator.farajaland-demo.opencrvs.org`)'
        - 'traefik.http.services.webhook-mediator.loadbalancer.server.port=4040'
        - 'traefik.http.routers.webhook-mediator.tls=true'
        - 'traefik.http.routers.webhook-mediator.tls.certresolver=certResolver'
        - 'traefik.http.routers.webhook-mediator.entrypoints=web,websecure'
        - 'traefik.docker.network=opencrvs_overlay_net'
        - 'traefik.http.middlewares.webhook-mediator.headers.customresponseheaders.Pragma=no-cache'
        - 'traefik.http.middlewares.webhook-mediator.headers.customresponseheaders.Cache-control=no-store'
        - 'traefik.http.middlewares.webhook-mediator.headers.customresponseheaders.X-Robots-Tag=none'
        - 'traefik.http.middlewares.webhook-mediator.headers.stsseconds=31536000'
        - 'traefik.http.middlewares.webhook-mediator.headers.stsincludesubdomains=true'
        - 'traefik.http.middlewares.webhook-mediator.headers.stspreload=true'
      replicas: 1
    networks:
      - overlay_net
    logging:
      driver: gelf
      options:
        gelf-address: 'udp://127.0.0.1:12201'
        tag: 'webhook-mediator'
```
