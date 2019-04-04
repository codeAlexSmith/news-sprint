const express = require("express");
const articlesRouter = express.Router();
const {
    getArticles,
    getArticleById,
    patchArticle,
    deleteArticle,
    getCommentsByArticle,
    postComment
} = require("../controllers/articles");
const { methodNotAllowed } = require("../errors");

articlesRouter
    .route("/")
    .get(getArticles)
    .all(methodNotAllowed);

articlesRouter
    .route("/:article_id")
    .get(getArticleById)
    .patch(patchArticle)
    .delete(deleteArticle)
    .all(methodNotAllowed);

articlesRouter
    .route("/:article_id/comments")
    .get(getCommentsByArticle)
    .post(postComment)
    .all(methodNotAllowed);

module.exports = { articlesRouter };
