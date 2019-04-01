 const { usersData,  } = require('../data/index');

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
        knex('users').insert(usersData).returning('*')
    }).then(usersRows => {
        const user
        return Promise.all([usersRows]);
      });;
};

