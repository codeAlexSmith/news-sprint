const express = require("express");
const articlesRouter = express.Router();
const { getArticles, getArticleById, patchArticle, deleteArticle, getCommentsByArticle , postComment} = require("../controllers/articles");

articlesRouter.route("/").get(getArticles);

articlesRouter.route('/:article_id')
.get(getArticleById)
.patch(patchArticle)
.delete(deleteArticle);

articlesRouter.route('/:article_id/comments')
.get(getCommentsByArticle)
.post(postComment)

module.exports = { articlesRouter };
