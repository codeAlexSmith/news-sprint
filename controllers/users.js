const { fetchUsers } = require("../models/users");
exports.getUsers = (req, res, next) => {
    console.log("here controller?");
    fetchUsers().then(users => {
        res.status(200).send({ users });
    });
};
