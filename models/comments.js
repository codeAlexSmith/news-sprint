const connection = require('../db/connection');
exports.fetchComments = () => {

    return connection
      .select('*').from('comments');
    }