const expect = require("chai").expect;
const request = require("request");
console.log("*-v-*|*-v-*|*-v-*|*-v-*|*-v-*|*-v-*|*-v-*|*-v-*|*-v-*|*-v-*");

describe("test case", () => {
  it("should print", () => {
    expect("hej").to.equal("hej");
  });
});

describe("test hello world", () => {
  it("should print", done => {
    request("http://localhost:8080/access", (error, response, body) => {
      expect(body).to.equal("Hello world!");
      done();
    });
  });
});

describe("login authentication", () => {
  it("should return a token if my credentials are authenticated", () => {
    request.post(
      {
        url: "http://localhost:8080/access",
        form: { username: "rufael@hej.com", password: "hejhej" }
      },
      (error, response, body) => {
        expect(body).to.be.a("string");
      }
    );
  });
  it("should not return a token if my credentials are authenticated", () => {
    request.post(
      {
        url: "http://localhost:8080/access",
        form: { username: "fake@fake.com", password: "password" }
      },
      (error, response, body) => {
        expect(response.statusCode).to.equal(400);
      }
    );
  });
});
