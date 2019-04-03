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
exports.formatComments = (commentsArray, articlesArray) => {
    let article_ids = articlesArray.map(article => article.article_id)
    let article_names = articlesArray.map(article => article.title)

    let formattedComments = [];
    commentsArray.forEach(comment =>{
        let newComments = {...comment}
        formattedComments
        .push(newComments)})
    
        formattedComments
        .forEach(comment =>{ 
         comment.author = comment.created_by;
        delete comment.created_by;    
        comment.article_id = articlesArray[articlesArray.findIndex(article => comment.belongs_to === article.title)].article_id     
        delete comment.belongs_to   
        comment.created_at = new Date(comment.created_at)
    })
    return formattedComments

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
