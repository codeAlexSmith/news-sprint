const connection = require('../db/connection');
exports.fetchUsers = () => {

    return connection
      .select('*').from('users');
    }