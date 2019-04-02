const connection = require('../db/connection');
exports.fetchArticles = () => {

    return connection
      .select('*').from('articles');
    }