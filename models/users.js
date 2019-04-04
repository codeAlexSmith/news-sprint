const connection = require('../db/connection');
exports.fetchUsers = () => {

    return connection
      .select('*').from('users');
    }

    exports.fetchSingleUser = (req) => {
    return connection
      .select('*')
      .from('users')
      .where('username', '=', req.params.username);
    }