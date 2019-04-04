const express = require("express");
const topicsRouter = express.Router();
const { getTopics } = require("../controllers/topics");
const { methodNotAllowed } = require("../errors");

topicsRouter
    .route("/")
    .get(getTopics)
    .all(methodNotAllowed);

module.exports = { topicsRouter };
