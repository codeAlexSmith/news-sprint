exports.up = function(knex, Promise) {
    console.log("creating articles table");
    return knex.schema.createTable("articles", articlesTable => {
        articlesTable.increments("article_id").primary();
        articlesTable.string("title").notNullable();
        articlesTable.text("body");
        articlesTable.string("author").references("users.username");
        articlesTable.integer("votes").defaultTo(0);
        articlesTable.timestamp("created_at").defaultTo(knex.fn.now());
        articlesTable.string("topic").references("topics.slug");
    });
};

exports.down = function(knex, Promise) {
    console.log("removing articles tables...");
    return knex.schema.dropTable("articles");
};
