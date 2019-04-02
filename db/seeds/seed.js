const data  = require('../data/index');
const {createUser} = require ('../utils');
console.log(data,'<<<<<')
exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate
    .latest())
    .then(() => {
       return knex('users').insert(data.users).returning('*')
      }).then(()=>{
          return knex('topics'.insert(data.topics).returning('*'))
      });;
};


