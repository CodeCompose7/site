FROM hugomods/hugo:exts-0.145.0
EXPOSE 1313
ENTRYPOINT ["hugo"]
CMD ["server", "--bind", "0.0.0.0", "--baseURL", "http://localhost:1313/", "--disableFastRender"]
