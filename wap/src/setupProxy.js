const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/socket",
    createProxyMiddleware({
      target: "http://localhost:3030",
      changeOrigin: true,
      pathRewrite: {
        "^/socket": "/socket.io"
      },
      ws: true
    })
  );
};
