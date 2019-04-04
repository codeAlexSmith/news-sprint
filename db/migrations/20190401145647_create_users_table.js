exports.up = function(knex, Promise) {
    console.log("creating user table maybe");
    return knex.schema.createTable("users", usersTable => {
        usersTable
            .string("username", 30)
            .primary()
            .unique();
        usersTable.string("avatar_url").notNullable();
        usersTable.string("name").notNullable();
    });
};

exports.down = function(knex, Promise) {
    console.log("removing user tables...");
    return knex.schema.dropTable("users");
};
