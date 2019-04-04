const { fetchComments, editComment } = require("../models/comments");

exports.getComments = (req, res, next) => {
    fetchComments().then(comments => {
        res.status(200).send({ comments });
    });
};

exports.patchComment = (req, res, next) => {
    console.log('controller', editComment)

    editComment(req).then(comment => {
        res.status(202).send({ comment });
    });
};