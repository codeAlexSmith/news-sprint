exports.obj = {
    "/users": {
        "/": { get: "returns all users" },
        "/:username": { get: "returns user by username" }
    },
    "/topics": { "/": { get: "returns all topics" } },
    "/articles": {
        "/": { get: "returns all articles" },
        "/:article_id": {
            get: "Gets the article by ID",
            patch: "Amends article by ID to increment votes",
            delete: "deletes article by ID"
        },
        "/:article_id/comments": {
            get: "Gets comments by article ID",
            post: "Posts a Comment to article by opriovided ID"
        }
    },
    "/comments": {
        "/": { get: "Gets all comments" },
        "/:comment:id": {
            patch: "Ammends a comment to increment votes",
            delete: "Deletes specified comment by ID"
        }
    },
    "/": { get: "Returns this object containing endpoints" }
};
