const data  = require('../data/index');
const {formatArticles, formatComments} = require ('../utils');
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
    })
    .then((articles)=>{
        return knex('comments').insert(formatComments(data.comments, articles)).returning('*')    
    });
};


