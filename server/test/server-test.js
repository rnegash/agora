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
        const authToken = JSON.parse(response.body).token;
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

describe("authenticated should be able to post response, and get responselists", () => {
  it("should return status code 200 if response was successfully posted", () => {
    request.post(
      {
        url: "http://localhost:8080/access",
        form: { username: "rufael@hej.com", password: "hejhej" }
      },
      (error, response, body) => {
        const authToken = JSON.parse(response.body).token;
        request.post(
          {
            url: "http://localhost:8080/response",
            headers: {
              Authorization: `Bearer ${authToken}`
            },
            form: {
              response: "chaiResponse",
              challengeId: 1
            }
          },
          (error, response, body) => {
            expect(response.statusCode).to.equal(200);
          }
        );
      }
    );
  });
  it("should return users own past responses", done => {
    request.post(
      {
        url: "http://localhost:8080/access",
        form: { username: "rufael@hej.com", password: "hejhej" }
      },
      (error, response, body) => {
        const authToken = JSON.parse(response.body).token;
        request.get(
          {
            url: "http://localhost:8080/response/user",
            headers: {
              Authorization: `Bearer ${authToken}`
            }
          },
          (error, response, body) => {
            const responses = JSON.parse(response.body);
            for (let key in responses) {
              if (error) {
                throw error;
              } else {
                expect(responses[key].userId).to.equal(1);
              }
            }
            expect(response.statusCode).to.equal(200);
            done();
          }
        );
      }
    );
  });
});
