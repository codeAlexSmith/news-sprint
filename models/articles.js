const connection = require('../db/connection');

exports.fetchArticles = ({author, topic, sort_by = 'created_at', order = 'desc'}) => {
     return connection
    .select('articles.article_id','title', 'articles.author', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .count({comment_count: 'comments.comment_id'})
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
    .where((builder =>{
        if(author) builder.where('articles.author','=', author);
        if(topic) builder.where('articles.topic','=',topic);
    }))
    .orderBy(sort_by, order);
};

exports.fetchArticleById = ({ article_id }) => {
    console.log('model')
    return connection
    .select('articles.article_id','title', 'articles.author', 'articles.body ', 'topic', 'articles.created_at', 'articles.votes')
    .from('articles')
    .count({comment_count: 'comments.comment_id'})
    .where('articles.article_id','=',article_id)
    .leftJoin('comments', 'articles.article_id', 'comments.article_id')
    .groupBy('articles.article_id')
};