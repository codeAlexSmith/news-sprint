const {obj} = require('../models/api')


    exports.apiGet = (req,res, next) => {
        res.status(200).send({obj});
    }