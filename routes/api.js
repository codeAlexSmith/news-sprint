const apiRouter = require('express').Router();
const { methodNotAllowed } = require('../errors');
const { usersRouter } = require('../routes/users')
const { topicsRouter } = require('../routes/topics')
const { articlesRouter } = require('../routes/articles')

apiRouter
  .route('/')
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);


module.exports = apiRouter;
