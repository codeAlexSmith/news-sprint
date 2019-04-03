const { fetchArticles} = require("../models/articles");
exports.getArticles = (req, res, next) => {
    const query = req.query
    fetchArticles(query).then(articles => {
        res.status(200).send({ articles });
    });
};