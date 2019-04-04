const { fetchUsers, fetchSingleUser } = require("../models/users");
exports.getUsers = (req, res, next) => {
    fetchUsers().then(users => {
        res.status(200).send({ users });
    });
};

exports.getUserByName = (req, res, next) => {
    fetchSingleUser(req).then(user => {
        res.status(200).send({ user });
    });
};
