const connection = require('../db/connection');
exports.fetchUsers = () => {
    console.log(connection)

    return connection
      .select('*').from('users');
    }