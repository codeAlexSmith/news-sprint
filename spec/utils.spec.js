process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");
const data  = require('../db/data/index');
const { formatArticles, formatComments } = require('../db/utils/index')
chai.use(chaiSorted);
const request = supertest(app);

describe("Testing Utility fucntions", () => {
    it.skip("Format Articles converts the articles objects to conform with the SQL schema", () => {
        formattedArray = formatArticles(data.articles);
        formattedArray.forEach( article => {
        expect(article).to.contain.keys('body', 'author', 'created_at', 'topic', 'title')
        expect(typeof article.title).to.equal('string')
        expect(typeof article.topic).to.equal('string')
        expect(typeof article.author).to.equal('string')
        expect(typeof article.body).to.equal('string')
        if(article.votes) expect(typeof article.votes).to.equal('number');
        expect(typeof article.created_at).to.equal('object')
    })
    });

    it.skip("Format Comments converts the comments object to conform with the sql schema", () => {
        let articles = formatArticles(data.articles);
        const formattedComments = formatComments(data.comments, articles);
        formattedComments.forEach( comment => {
            expect(comment).to.contain.keys('body', 'author', 'created_at', 'votes' , 'article_id')
            expect(typeof comment.body).to.equal('string')
            if(comment.votes) expect(typeof comment.votes).to.equal('number');
            expect(typeof comment.created_at).to.equal('object')
        })
    });
});
