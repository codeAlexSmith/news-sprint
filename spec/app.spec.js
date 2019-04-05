process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

chai.use(chaiSorted);
const request = supertest(app);

describe("/", () => {
    beforeEach(() => connection.seed.run());
    after(() => connection.destroy());

    describe.only("/users", () => {
        it("GET status:200 and returns users", () => {
            return request
                .get("/api/users")
                .expect(200)
                .then(res => {
                    expect(Array.isArray(res.body.users)).to.equal(true);
                    res.body.users.forEach(user =>
                        expect(user).to.contain.keys([
                            "username",
                            "avatar_url",
                            "name"
                        ])
                    );
                });
        });

        it("Can handle 405 errors for methods not allowed", () => {
            return request
                .put("/api/users")
                .expect(405)
                .then(res => {
                    expect(res.body).to.eql({ msg: "Method Not Allowed" });
                });
        });
    });

    describe.only("/topics", () => {
        it("GET status:200", () => {
            return request
                .get("/api/topics")
                .expect(200)
                .then(res => {
                    expect(Array.isArray(res.body.topics)).to.equal(true);
                    res.body.topics.forEach(topics =>
                        expect(topics).to.contain.keys(["description", "slug"])
                    );
                });
        });
        it("Can handle 405 errors for methods not allowed", () => {
            return request
                .put("/api/topics")
                .expect(405)
                .then(res => {
                    expect(res.body).to.eql({ msg: "Method Not Allowed" });
                });
        });
    });

    describe.only("/articles", () => {
        it("GET status:200", () => {
            return request
                .get("/api/articles")
                .expect(200)
                .then(res => {
                    expect(Array.isArray(res.body.articles)).to.equal(true);
                    res.body.articles.forEach(articles => {
                        expect(articles).to.contain.keys([
                            "article_id",
                            "author",
                            "comment_count",
                            "title",
                            "topic",
                            "votes"
                        ]);
                        expect(articles.votes >= 0).to.equal(true);
                    });
                });
        });
        it("Can handle 405 errors for methods not allowed", () => {
            return request
                .put("/api/articles")
                .expect(405)
                .then(res => {
                    expect(res.body).to.eql({ msg: "Method Not Allowed" });
                });
        });
    });

    describe.only("/articles?author=butter_bridge", () => {
        it("GET status:200", () => {
            return request
                .get("/api/articles?author=butter_bridge")
                .expect(200)
                .then(res => {
                    res.body.articles.forEach(article =>
                        expect(article.author).to.equal("butter_bridge")
                    );
                });
        });
        it("GET status:200", () => {
            return request
                .get("/api/articles?author=icellusedkars")
                .expect(200)
                .then(res => {
                    res.body.articles.forEach(article => {
                        expect(article.author).to.equal("icellusedkars");
                        expect(article).to.contain.keys(
                            "article_id",
                            "topic",
                            "votes",
                            "comment_count"
                        );
                    });
                });
        });
        it("Can handle 405 errors for methods not allowed", () => {
            return request
                .put("/api/articles?author=icellusedcars")
                .expect(405)
                .then(res => {
                    expect(res.body).to.eql({ msg: "Method Not Allowed" });
                });
        });
    });

    describe("/articles?topic=mitch", () => {
        it("GET status:200", () => {
            return request
                .get("/api/articles?topic=mitch")
                .expect(200)
                .then(res => {
                    res.body.articles.forEach(article =>
                        expect(article.topic).to.equal("mitch")
                    );
                });
        });
    });

    describe("/articles/sort_by=comment_count", () => {
        it("GET status:200", () => {
            return request
                .get("/api/articles?sort_by=comment_count")
                .expect(200)
                .then(res => {
                    res.body.articles.forEach(
                        article =>
                            (article.comment_count = Number(
                                article.comment_count
                            ))
                    );
                    expect(res.body.articles).to.be.sortedBy("comment_count", {
                        descending: true
                    });
                });
        });
    });

    describe("/articles/sort_by=comment_count&order=asc", () => {
        it("GET status:200", () => {
            return request
                .get("/api/articles?sort_by=comment_count&order=asc")
                .expect(200)
                .then(res => {
                    res.body.articles.forEach(
                        article =>
                            (article.comment_count = Number(
                                article.comment_count
                            ))
                    );
                    expect(res.body.articles).to.be.sortedBy("comment_count", {
                        descending: false
                    });
                });
        });
    });

    describe.only("/articles/3", () => {
        it("Can Get the correct article when provided with a correct article ID", () => {
            return request
                .get("/api/articles/3")
                .expect(200)
                .then(res => {
                    expect(res.body.article_id).to.have.length(1);
                    expect(res.body.article_id[0].body).to.equal("some gifs");
                    expect(res.body.article_id[0]).to.contain.keys([
                        "article_id",
                        "author",
                        "comment_count",
                        "title",
                        "topic",
                        "votes",
                        "body",
                        "created_at"
                    ]);
                    expect(res.body.article_id[0].comment_count).to.equal("0");
                });
        });

        it("returns a 400 when given a non numeric value ", () => {
            return request
                .get("/api/articles/3a")
                .expect(400)
                .then(res => {
                    expect(res.body).to.eql({ msg: "Bad Request Not Found" });
                });
        });

        it("returns a 404 when given numeric value of a  non existent article", () => {
            return request
                .get("/api/articles/340")
                .expect(404)
                .then(res => {
                    expect(res.body).to.eql({ msg: "Route Not Found" });
                });
        });
    });

    describe("/comments", () => {
        it("GET status:200", () => {
            return request
                .get("/api/comments")
                .expect(200)
                .then(res => {
                    expect(Array.isArray(res.body.comments)).to.equal(true);
                    res.body.comments.forEach(comments => {
                        expect(comments).to.contain.keys([
                            "article_id",
                            "author",
                            "body",
                            "votes",
                            "comment_id",
                            "created_at"
                        ]);
                    });
                });
        });

        describe("/patch Article", () => {
            it("GET status:202", () => {
                return request
                    .patch("/api/articles/3")
                    .send({ votes: 5 })
                    .expect(202)
                    .then(res => {
                        expect(res.body.article[0]).to.contain.keys(
                            "author",
                            "body",
                            "votes"
                        );
                        return request
                            .get("/api/articles/3")
                            .expect(200)
                            .then(res =>
                                expect(res.body.article_id[0].votes).to.equal(5)
                            )
                            .then(res => {
                                return request
                                    .patch("/api/articles/3")
                                    .send({ votes: -2 })
                                    .expect(202)
                                    .then(res => {
                                        return request
                                            .get("/api/articles/3")
                                            .expect(200)
                                            .then(res =>
                                                expect(
                                                    res.body.article_id[0].votes
                                                ).to.equal(3)
                                            );
                                    });
                            });
                    });
            });
        });
    });

    describe("/DELETE article", () => {
        it("Deletes the coresponding article", () => {
            return request
                .delete("/api/articles/4")
                .expect(204)
                .then(res => {
                    return request
                        .get("/api/articles")
                        .then(res =>
                            res.body.articles.forEach(art =>
                                expect(art.article_id !== 4).to.equal(true)
                            )
                        );
                });
        });
    });

    describe.only("/api/articles/:article_id/comments", () => {
        it("gets the comments by article_id", () => {
            return request
                .get("/api/articles/5/comments")
                .expect(200)
                .then(res => {
                    res.body.comments.forEach(comment =>
                        expect(comment.article_id).to.equal(5)
                    );
                });
        });
        it("hsndles errors for a non-valid article_id", () => {
            return request
                .get("/api/articles/g/comments")
                .expect(400)
                .then(res => {
                    expect(res.body).to.eql({ msg: "Bad Request Not Found" });
                });
        });
        it("handles errors for a non existent article_id", () => {
            return request
                .get("/api/articles/5555/comments")
                .expect(404)
                .then(res => {
                    expect(res.body).to.eql({ msg: "Route Not Found" });
                });
        });
    });

    describe("/api/articles/:article_id/comments", () => {
        it("gets the comments by article_id", () => {
            return request
                .post("/api/articles/5/comments")
                .send({ username: "icellusedkars", comment: "something vague" })
                .expect(202)
                .then(res => {
                    console.log(res.body.comments[0].created_at);
                    expect(res.body.comments[0]).to.contain.keys([
                        "body",
                        "created_at"
                    ]);
                    expect(res.body.comments[0].body).equal("something vague");
                });
        });
    });

    describe("/api/comments/:comment_id", () => {
        it("patchess the comments votes by comment_id", () => {
            return request
                .patch("/api/comments/3")
                .send({ votes: -4 })
                .expect(202)
                .then(res => {
                    expect(res.body.comment[0].votes).to.equal(96);
                    console.log(res.body.comment);
                });
        });
    });

    describe("/DELETE comment", () => {
        it("Deletes the coresponding comment", () => {
            return request
                .delete("/api/comments/15")
                .expect(204)
                .then(res => {
                    return request
                        .get("/api/comments")
                        .then(res =>
                            res.body.comments.forEach(com =>
                                expect(com.comment_id !== 15)
                            )
                        );
                });
        });
    });

    describe("/get user by username", () => {
        it("Deletes the coresponding comment", () => {
            return request
                .get("/api/users/icellusedkars")
                .expect(200)

                .then(res =>
                    expect(res.body.user[0]).to.contain.keys(
                        "username",
                        "avatar_url",
                        "name"
                    )
                );
        });
    });

    describe("get information on endpoints from /api/", () => {
        it("respinds with a json object which has the relevant endpoint information", () => {
            return request
                .get("/api/")
                .expect(200)
                .then(res => {
                    expect(typeof res.body).to.equal("object");
                    expect(res.body).to.contain.keys(
                        "/",
                        "/users",
                        "/topics",
                        "/comments",
                        "/articles"
                    );
                });
        });
    });

    describe("Can handle all method not allowed errors", () => {
        it("responds with message not allowed when url is correct but method is wrong test 1", () => {
            return request
                .post("/api/")
                .expect(405)
                .then(res => {
                    expect(res.body.msg).to.equal("Method Not Allowed");
                });
        });
        it("responds with message not allowed when url is correct but method is wrong test 2", () => {
            return request
                .post("/api/articles/")
                .expect(405)
                .then(res => {
                    expect(res.body.msg).to.equal("Method Not Allowed");
                });
        });
        it("responds with message not allowed when url is correct but method is wrong test 3", () => {
            return request
                .post("/api/topics/")
                .expect(405)
                .then(res => {
                    expect(res.body.msg).to.equal("Method Not Allowed");
                });
        });
        it("responds with message not allowed when url is correct but method is wrong test 4", () => {
            return request
                .put("/api/comments/5")
                .expect(405)
                .then(res => {
                    expect(res.body.msg).to.equal("Method Not Allowed");
                });
        });
    });

    describe("Error handling", () => {
        it("status 404 for invalid routes", () => {
            return request.get("/api/likes").expect(404);
        });
    });
});
