const { fetchComments } = require("../models/comments");
exports.getComments = (req, res, next) => {
    fetchComments().then(comments => {
        res.status(200).send({ comments });
    });
};