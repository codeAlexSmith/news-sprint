const {
    fetchArticles,
    fetchArticleById,
    updateArticle,
    removeArticle,
    fetchCommentsByArticle,
    createComment
} = require("../models/articles");

exports.getArticles = (req, res, next) => {
    const query = req.query;

    fetchArticles(query).then(articles => {
        res.status(200).send({ articles });
    });
};

exports.getArticleById = (req, res, next) => {
    const params = req.params;
    fetchArticleById(params).then(article_id => {
        res.status(200).send({ article_id });
    });
};

exports.patchArticle = (req, res, next) => {
    updateArticle(req).then(article => {
        res.status(202).send({ article });
    });
};

exports.deleteArticle = (req, res, next) => {
    removeArticle(req).then(article => {
        res.status(204).send({ article });
    });
};

exports.getCommentsByArticle = (req, res, next) => {
    fetchCommentsByArticle(req).then(comments => {
        res.status(200).send({ comments });
    });
};

exports.postComment = (req, res, next) => {
    createComment(req).then(comments => {
        res.status(202).send({ comments });
    });
};
