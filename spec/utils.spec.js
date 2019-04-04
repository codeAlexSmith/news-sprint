process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiSorted = require("chai-sorted");
const { expect } = chai;
const supertest = require("supertest");

const app = require("../app");
const connection = require("../db/connection");

chai.use(chaiSorted);
const request = supertest(app);

describe("Testing Utility fucntions", () => {
    it("Format Articles converts the articles objects to conform with the SQL schema", () => {});

    it("Format Comments converts the comments object to conform with the sql schema", () => {});
});
