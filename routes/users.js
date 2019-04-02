const express = require("express");
const usersRouter = express.Router();
const { getUsers } = require("../controllers/users");
console.log("here routes?");
usersRouter.route("/").get(getUsers);
module.exports = { usersRouter };
