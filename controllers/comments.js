const { fetchComments, editComment, removeComment } = require("../models/comments");

exports.getComments = (req, res, next) => {
    fetchComments().then(comments => {
        res.status(200).send({ comments });
    });
};

exports.patchComment = (req, res, next) => {
    editComment(req).then(comment => {
        res.status(202).send({ comment });
    });
};

exports.deleteComment = (req, res, next) => {
    removeComment(req).then(comment => {
        res.status(204).send({ comment });
    });
};