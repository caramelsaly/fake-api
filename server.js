const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// 记录每一个请求
server.use((req, res, next) => {
  console.log(`收到请求: ${req.method} ${req.url}`);
  next();
});

server.use(middlewares);
server.use(router);

// 全局错误捕获
server.use((err, req, res, next) => {
  console.error('服务器内部错误:', err.stack);
  res.status(500).json({ error: '服务器内部错误' });
});

const port = process.env.PORT || 3000;
server.listen(port, '0.0.0.0', () => {
  console.log(`JSON Server 运行在端口 ${port}`);
});
