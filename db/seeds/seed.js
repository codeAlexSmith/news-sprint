const data  = require('../data/index');
const {formatArticles} = require ('../utils');
exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate
    .latest())
    .then(() => {
       return knex('users').insert(data.users).returning('*')
      })
      .then(()=>{
          return knex('topics').insert(data.topics).returning('*')
      })
      .then(()=>{
            return knex('articles').insert(formatArticles(data.articles)).returning('*')
    });
};


