const express = require("express");
const  commentsRouter  = express.Router();
const { getComments, patchComment } = require("../controllers/comments");

commentsRouter.route("/").get(getComments);

commentsRouter.route("/:comment_id")
.patch(patchComment);

module.exports = { commentsRouter };
