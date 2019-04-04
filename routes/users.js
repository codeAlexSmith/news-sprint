const express = require("express");
const usersRouter = express.Router();
const { getUsers, getUserByName } = require("../controllers/users");

usersRouter.route("/").get(getUsers);
usersRouter.route("/:username").get(getUserByName);

module.exports = { usersRouter };
