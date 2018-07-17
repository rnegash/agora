const expect = require("chai").expect;
const request = require("request");
console.log("*-v-*|*-v-*|*-v-*|*-v-*|*-v-*|*-v-*|*-v-*|*-v-*|*-v-*|*-v-*");

describe("test hello world", () => {
  it("should print hello world", done => {
    request("http://localhost:8080/access", (error, response, body) => {
      expect(body).to.equal("Hello world!");
      done();
    });
  });
});

describe("login authentication", () => {
  it("should return a token if my credentials are authenticated", done => {
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
    done();
  });
  it("should not return a token if my credentials are authenticated", done => {
    request.post(
      {
        url: "http://localhost:8080/access",
        form: { username: "fake@fake.com", password: "password" }
      },
      (error, response, body) => {
        expect(response.statusCode).to.equal(400);
      }
    );
    done();
  });
});

describe("authenticated  users should be able to post response, and get responselists", () => {
  it("should return status code 200 if response was successfully posted", done => {
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
    done();
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
          }
        );
      }
    );
    done();
  });

  it("should return other users answers on the daily challenge", done => {
    request.post(
      {
        url: "http://localhost:8080/access",
        form: { username: "rufael@hej.com", password: "hejhej" }
      },
      (error, response, body) => {
        const authToken = JSON.parse(response.body).token;
        request.get(
          {
            url: "http://localhost:8080/response",
            headers: {
              Authorization: `Bearer ${authToken}`
            },
            form: { challengeId: 1, response: "I think its great" }
          },
          (error, response, body) => {
            const responses = JSON.parse(response.body);
            for (let key in responses) {
              if (error) {
                throw error;
              } else {
                expect(responses[key].userId).to.not.equal(1);
              }
            }
            expect(response.statusCode).to.equal(200);
          }
        );
      }
    );
    done();
  });
});

describe("should be able to register with email and password", () => {
  it("return status code 200 if successfully registered", done => {
    request.post(
      {
        url: "http://localhost:8080/register",
        form: { username: "newuser@hej.com", password: "hejhej" }
      },
      (error, response, body) => {
        expect(response.statusCode).to.equal(200);
      }
    );
    done();
  });
});
