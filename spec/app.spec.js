process.env.NODE_ENV = "test";

const chai = require('chai');
const chaiSorted = require('chai-sorted');
const { expect } = chai;
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

chai.use(chaiSorted);
const request = supertest(app);

describe("/", () => {
   // beforeEach(() => connection.seed.run());
    after(() => connection.destroy());

    describe("/api", () => {
        it("GET status:200", () => {
            return request
                .get("/api")
                .expect(200)
                .then(({ body }) => {
                    expect(body.ok).to.equal(true);
                });
        });
    });

    describe("/users", () => {
        it("GET status:200", () => {
            return request.get("/api/users").expect(200)
            .then((res) => {
              expect(Array.isArray(res.body.users)).to.equal(true);
              res.body.users.forEach(user => expect(user).to.contain.keys(['username', 'avatar_url', 'name']));
            });
        });
    });
    
    describe("/topics", () => {
        it("GET status:200", () => {
            return request.get("/api/topics").expect(200)
            .then((res) => {
              expect(Array.isArray(res.body.topics)).to.equal(true);
              res.body.topics.forEach(topics => expect(topics).to.contain.keys(['description', 'slug']));
            });
        });
    });

    describe("/articles", () => {
        it("GET status:200", () => {
            return request.get("/api/articles").expect(200)
            .then((res) => {
              expect(Array.isArray(res.body.articles)).to.equal(true);
              res.body.articles.forEach(articles => {
                  expect(articles).to.contain.keys(['article_id', 'author', 'comment_count', 'title', 'topic', 'votes']);
                  expect(articles.votes>=0).to.equal(true);
            });
        });
    });
    })

    describe("/articles?author=butter_bridge", () => {
        it("GET status:200", () => {
            return request.get("/api/articles?author=butter_bridge").expect(200)
            .then((res) => {
                res.body.articles.forEach(article => expect(article.author).to.equal('butter_bridge'))
            });
        });
    });
 
    describe("/articles?topic=mitch", () => {
        it("GET status:200", () => {
            return request.get("/api/articles?topic=mitch").expect(200)
            .then((res) => {
                res.body.articles.forEach(article => expect(article.topic).to.equal('mitch'))
            });
        });
    });
   
    describe("/articles/sort_by=comment_count", () => {
        it("GET status:200", () => {
            return request.get("/api/articles?sort_by=comment_count").expect(200)
            .then((res) => {
                res.body.articles.forEach(article => article.comment_count = Number(article.comment_count))
                expect(res.body.articles).to.be.sortedBy('comment_count', {descending: true});
            });
        });
    });
   
    describe("/articles/sort_by=comment_count&order=asc", () => {
        it("GET status:200", () => {
            return request.get("/api/articles?sort_by=comment_count&order=asc").expect(200)
            .then((res) => {
                res.body.articles.forEach(article => article.comment_count = Number(article.comment_count))
                expect(res.body.articles).to.be.sortedBy('comment_count', {descending: false});
            });
        });
    });

    describe("/articles/3", () => {
        it("GET status:200", () => {
            return request.get("/api/articles/3").expect(200)
            .then((res) => {
                expect(res.body.article_id).to.have.length(1)
                expect(res.body.article_id[0].body).to.equal('some gifs')
                expect(res.body.article_id[0]).to.contain.keys(['article_id', 'author', 'comment_count', 'title', 'topic', 'votes', 'body', 'created_at']);
                expect(res.body.article_id[0].comment_count).to.equal('0')
            });
        });
    });
   
    describe("/comments", () => {
        it("GET status:200", () => {
            return request.get("/api/comments").expect(200)
            .then((res) => {
              expect(Array.isArray(res.body.comments)).to.equal(true);
              res.body.comments.forEach(comments => {
                  expect(comments).to.contain.keys(['article_id', 'author', 'body', 'votes', 'comment_id', 'created_at']);
            });
        });
    });

    describe("/patch Article", () => {
        it("GET status:202", () => {
            return request.patch("/api/articles/3")
            .send({ title: 'testtetsttvetevcev' })
            .expect(202)
            .then((res)=>{
                return request.get('/api/articles/3')
                .expect(200)
                .then((res) => console.log(res.body))});
        });
    });
});
});
