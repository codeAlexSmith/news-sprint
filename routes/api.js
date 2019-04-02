const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { usersRouter } = require('../routes/users')

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use('/users', usersRouter);


module.exports = apiRouter;
