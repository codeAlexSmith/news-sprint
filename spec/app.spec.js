process.env.NODE_ENV = "test";

const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

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
                  expect(articles).to.contain.keys(['article_id', 'author', 'body', 'title', 'topic', 'votes']);
                  expect(articles.votes>=0).to.equal(true);
            });
        });
    });
    })
});
