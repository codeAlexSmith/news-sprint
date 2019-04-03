const { fetchArticles, fetchArticleById } = require("../models/articles");

exports.getArticles = (req, res, next) => {
    const query = req.query

    fetchArticles(query).then(articles => {
        res.status(200).send({ articles });
    });
};
exports.getArticleById = (req, res, next) => {
    const params = req.params
    console.log(fetchArticleById)
    fetchArticleById(params).then(article_id => {
        console.log('here')
        res.status(200).send({ article_id });
    });
};