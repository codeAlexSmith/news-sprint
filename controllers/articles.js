const { fetchArticles, fetchArticleById, updateArticle } = require("../models/articles");

exports.getArticles = (req, res, next) => {
    const query = req.query

    fetchArticles(query).then(articles => {
        res.status(200).send({ articles });
    });
};

exports.getArticleById = (req, res, next) => {
    const params = req.params
    fetchArticleById(params).then(article_id => {
        res.status(200).send({ article_id });
    });
};

exports.patchArticle = (req, res, next) => {
    console.log(req, '<<<<<')
    console.log(updateArticle.toString())
    updateArticle(req).then(article => {
        res.status(202).send({article})
    });
};