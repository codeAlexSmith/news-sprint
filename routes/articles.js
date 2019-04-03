const express = require("express");
const articlesRouter = express.Router();
const { getArticles, getArticleById, patchArticle, deleteArticle, getCommentsByArticle } = require("../controllers/articles");

articlesRouter.route("/").get(getArticles);

articlesRouter.route('/:article_id')
.get(getArticleById)
.patch(patchArticle)
.delete(deleteArticle);
console.log(getCommentsByArticle)

articlesRouter.route('/:article_id/comments')
.get(getCommentsByArticle)

module.exports = { articlesRouter };
