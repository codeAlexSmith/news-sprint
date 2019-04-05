const {
    fetchArticles,
    fetchArticleById,
    updateArticle,
    removeArticle,
    fetchCommentsByArticle,
    createComment
} = require("../models/articles");
const { handle400, routeNotFound } = require("../errors/index");

exports.getArticles = (req, res, next) => {
    const query = req.query;

    fetchArticles(query).then(articles => {
        res.status(200).send({ articles });
    });
};

exports.getArticleById = (req, res, next) => {
    const params = req.params;
    const validNum = !(
        new RegExp(/[0-9]+/).test(req.params.article_id) &&
        !new RegExp(/[A-z]+/).test(req.params.article_id)
    );
    if (validNum) handle400(req, res);
    else {
        fetchArticleById(params).then(article_id => {
            if (article_id.length === 0) routeNotFound(req, res);
            else res.status(200).send({ article_id });
        });
    }
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
    const validNum = !(
        new RegExp(/[0-9]+/).test(req.params.article_id) &&
        !new RegExp(/[A-z]+/).test(req.params.article_id)
    );
    if (validNum) handle400(req, res);
    else {
        fetchCommentsByArticle(req).then(comments => {
            if (comments.length === 0) routeNotFound(req, res);
            else res.status(200).send({ comments });
        });
    }
};

exports.postComment = (req, res, next) => {
    createComment(req).then(comments => {
        res.status(202).send({ comments });
    });
};
