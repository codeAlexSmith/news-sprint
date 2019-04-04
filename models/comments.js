const connection = require('../db/connection');
exports.fetchComments = () => {

    return connection
      .select('*').from('comments');
    }

exports.editComment = (req, res) => {
    console.log('model', req)
    return connection("comments")
    .where("comment_id", "=", req.params.comment_id)
    .increment(req.body, ["votes"])
    .returning("*");
};