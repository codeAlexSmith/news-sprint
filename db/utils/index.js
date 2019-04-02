exports.formatArticles = (articleArray) => {
    
    let formattedArticles = [];
    articleArray.forEach(article =>{
        let newArticle = {...article}
        formattedArticles
        .push(newArticle)})
    
        formattedArticles
        .forEach(article =>{ 
        article.created_at =new  Date(article.created_at)
    })
    return formattedArticles

}


// {
//     title: 'Living in the shadow of a great man',
//     topic: 'mitch',
//     author: 'butter_bridge',
//     body: 'I find this existence challenging',
//     created_at: 1542284514171,
//     votes: 100,
//   },


// exports.up = function(knex, Promise) {
//     console.log('creating articles table')
//     return knex.schema.createTable('articles', (articlesTable) => {
//         articlesTable.increments('article_id').primary();
//         articlesTable.string('title').notNullable();
//         articlesTable.string('body').notNullable();
//         articlesTable.string('author').references('users.username'); 
//         articlesTable.integer('votes').defaultTo(0); 
//         articlesTable.timestamp('created_at');  
// });
// };

// exports.down = function(knex, Promise) {
//     console.log('removing articles tables...');
//   return knex.schema.dropTable('articles');
// };
