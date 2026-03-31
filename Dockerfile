FROM hugomods/hugo:exts-0.145.0

# Slidev 빌드를 위한 Node.js 설치 (Alpine)
RUN apk add --no-cache nodejs npm

EXPOSE 1313
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["server", "--bind", "0.0.0.0", "--baseURL", "http://localhost:1313/", "--disableFastRender"]
