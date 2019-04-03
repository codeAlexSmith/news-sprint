const express = require("express");
const articlesRouter = express.Router();
const { getArticles, getArticleById, patchArticle } = require("../controllers/articles");
console.log(patchArticle.toString())
articlesRouter.route("/").get(getArticles);
articlesRouter.route('/:article_id')
.get(getArticleById)
.patch(patchArticle);

module.exports = { articlesRouter };
