const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
    logger: true,
    noCors: false,
});
const port = process.env.PORT || 3000;
server.use(middlewares);
server.use(jsonServer.rewriter({
  "/posts/:slug": "/posts?slug=:slug",
  "/comments/:postId": "/comments?postId=:postId"
}))
server.use(router);
console.log(port)
server.listen(port);