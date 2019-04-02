
exports.up = function(knex, Promise) {
    console.log('creating comments table maybe')
    return knex.schema.createTable('comments', (commentsTable) => {
        commentsTable.string('comment_id').primary();
        commentsTable.string('author').notNullable();
        commentsTable.integer('article_id').references('articles.article_id');
        commentsTable.integer('votes').defaultTo(0);
        commentsTable.timestamp('created_at');
        commentsTable.string('body').notNullable();
});
};

exports.down = function(knex, Promise) {
    console.log('removing user tables...');
    return knex.schema.dropTable('comments');
};