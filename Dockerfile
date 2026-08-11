# syntax=docker/dockerfile:1

FROM caddy:2-alpine AS runtime

COPY docker/Caddyfile /etc/caddy/Caddyfile
COPY index.html manifest.json /srv/
COPY dist /srv/dist
COPY assets /srv/assets

EXPOSE 8080

HEALTHCHECK --interval=1m --timeout=10s --start-period=5s --retries=3 \
    CMD wget --spider -q http://localhost:8080/ || exit 1

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
