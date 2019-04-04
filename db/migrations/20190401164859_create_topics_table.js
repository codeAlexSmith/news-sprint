
exports.up = function(knex, Promise) {
    console.log('creating topics table')
    return knex.schema.createTable('topics', (topicsTable) => {
        topicsTable.string('description').notNullable();
        topicsTable.string('slug').primary().unique(); 
}); 
};

exports.down = function(knex, Promise) {
    console.log('removing topics tables...');
  return knex.schema.dropTable('topics');
};
