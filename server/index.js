const jsonServer = require('json-server');
const path = require('path');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3300;

server.use(middlewares);

server.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.use(router);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});