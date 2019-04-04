const express = require("express");
const usersRouter = express.Router();
const { getUsers, getUserByName } = require("../controllers/users");
const { methodNotAllowed } = require("../errors");

usersRouter
    .route("/")
    .get(getUsers)
    .all(methodNotAllowed);

usersRouter
    .route("/:username")
    .get(getUserByName)
    .all(methodNotAllowed);

module.exports = { usersRouter };
