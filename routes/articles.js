const express = require("express");
const articlesRouter = express.Router();
const { getArticles, getArticleById, patchArticle, deleteArticle } = require("../controllers/articles");

articlesRouter.route("/").get(getArticles);

articlesRouter.route('/:article_id')
.get(getArticleById)
.patch(patchArticle)
.delete(deleteArticle);

module.exports = { articlesRouter };
