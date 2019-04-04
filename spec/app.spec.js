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
     beforeEach(() => connection.seed.run());
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
            .send({ votes: 5 })
            .expect(202)
            .then((res)=>{
                expect(res.body.article[0]).to.contain.keys('author', 'body', 'votes')
                return request.get('/api/articles/3')
                .expect(200)
                .then((res) => expect(res.body.article_id[0].votes).to.equal(5))
                .then((res) => {
                     return request.patch("/api/articles/3")
                    .send({ votes: -2 })
                    .expect(202)
                    .then((res)=>{
                    return request.get('/api/articles/3')
                    .expect(200)
                .then((res) => expect(res.body.article_id[0].votes).to.equal(3));
                 })
            });
        });
    });
    });
    });

    describe('/DELETE article', () => {
        it('Deletes the coresponding article', () => {
            return request.delete('/api/articles/4')
            .expect(204)
            .then((res) => {
                return request.get('/api/articles')
                .then((res) => res.body.articles.forEach(art => art.article_id !== 4))
              })
            
        });
    });

    describe('/api/articles/:article_id/comments', () => {
        it('gets the comments by article_id', () => {
              return request.get('/api/articles/5/comments')
              .expect(200)
              .then((res)=>{res.body.comments.forEach(comment => expect(comment.article_id).to.equal(5))})
            })
        });

    describe('/api/articles/:article_id/comments', () => {
        it('gets the comments by article_id', () => {
              return request.post('/api/articles/5/comments')
              .send({username: 'icellusedkars', comment: 'something vague' })
              .expect(202)
              .then((res)=>{expect(res.body.comments[0]).to.contain.keys(['body', 'created_at'])
              expect(res.body.comments[0].body).equal('something vague')})
            })
        });
    
    describe('/api/comments/:comment_id', () => {
        it('patchess the comments votes by comment_id', () => {
              return request.patch('/api/comments/3')
              .send({votes: -4})
              .expect(202)
              .then((res)=>{expect(res.body.comment[0].votes).to.equal(96)
                console.log(res.body.comment)
              })
            })
        });

    describe('/DELETE comment', () => {
            it('Deletes the coresponding comment', () => {
                return request.delete('/api/comments/15')
                .expect(204)
                .then((res) => {
                    return request.get('/api/comments')
                    .then((res) => res.body.comments.forEach(com =>  expect(com.comment_id !== 15)))
                  })
                
            });
        });
    
        describe('/get user by usernane', () => {
            it('Deletes the coresponding comment', () => {
                return request.get('/api/users/icellusedkars')
                .expect(200)
                    .then((res) => expect(res.body).to.contain.keys('user', 'avatar_url', 'name'))
            });
        });
})
