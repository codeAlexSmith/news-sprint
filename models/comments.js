const connection = require('../db/connection');
exports.fetchComments = () => {

    return connection
      .select('*').from('comments');
    }

exports.editComment = (req, res) => {
    return connection("comments")
    .where("comment_id", "=", req.params.comment_id)
    .increment(req.body, ["votes"])
    .returning("*");
};

exports.removeComment = (req, res) => {
    return connection('comments')
    .where('comment_id' , '=', req.params.comment_id)
    .del();

};