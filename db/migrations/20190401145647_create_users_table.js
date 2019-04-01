
exports.up = function(knex, Promise) {
    console.log('creating user table maybe')
    return knex.schema.createTable('users', (usersTable) => {
        usersTable.increments('users_id').primary();
        usersTable.string('username').notNullable();
        usersTable.string('name').notNullable();
        usersTable.string('avatar_url').notNullable();
});
}

exports.down = function(knex, Promise) {
    console.log('removing user tables...');
  return knex.schema.dropTable('users');
};
