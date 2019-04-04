const express = require("express");
const commentsRouter = express.Router();
const {
    getComments,
    patchComment,
    deleteComment
} = require("../controllers/comments");
const { methodNotAllowed } = require("../errors");

commentsRouter.route("/").get(getComments);
commentsRouter
    .route("/:comment_id")
    .patch(patchComment)
    .delete(deleteComment)
    .all(methodNotAllowed);

module.exports = { commentsRouter };
