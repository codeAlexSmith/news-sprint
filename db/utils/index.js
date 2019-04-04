exports.formatArticles = articleArray => {
    let formattedArticles = [];
    articleArray.forEach(article => {
        let newArticle = { ...article };
        newArticle.created_at = new Date(newArticle.created_at);
        formattedArticles.push(newArticle);
    });
    return formattedArticles;
};
exports.formatComments = (commentsArray, articlesArray) => {
    let formattedComments = [];
    commentsArray.forEach(comment => {
        let newComments = { ...comment };
        formattedComments.push(newComments);
    });

    formattedComments.forEach(comment => {
        comment.author = comment.created_by;
        delete comment.created_by;
        comment.article_id = articlesArray.find(
            article => comment.belongs_to === article.title
        ).article_id;
        delete comment.belongs_to;
        comment.created_at = new Date(comment.created_at);
    });
    return formattedComments;
};
