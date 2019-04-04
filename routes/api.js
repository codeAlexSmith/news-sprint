const apiRouter = require("express").Router();
const { methodNotAllowed } = require("../errors");
const { usersRouter } = require("../routes/users");
const { topicsRouter } = require("../routes/topics");
const { articlesRouter } = require("../routes/articles");
const { commentsRouter } = require("../routes/comments");
const { apiGet } = require("../controllers/api");

apiRouter.route("/")
    .get(apiGet)
    .all(methodNotAllowed);

apiRouter.use("/users", usersRouter);
apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
