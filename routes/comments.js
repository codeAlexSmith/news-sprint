const express = require("express");
const  commentsRouter  = express.Router();
const { getComments, patchComment, deleteComment } = require("../controllers/comments");

commentsRouter.route("/").get(getComments);
commentsRouter.route("/:comment_id")
.patch(patchComment)
.delete(deleteComment);


module.exports = { commentsRouter };
