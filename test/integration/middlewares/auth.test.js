const { User } = require("../../../models/user");
const request = require("supertest");
let server;
const expect = require("chai").expect;
require("dotenv").config();

describe("auth middleware", () => {
  beforeEach(() => {
    server = require("../../../server");
    User.find().deleteMany();
  });
  afterEach(() => {
    server.close();
    User.find().deleteMany();
  });
  let token;
  const exec = () => {
    return request(server)
      .get("/api/users/me")
      .set(process.env.JWT_HEADER, token)
      .send();
  };
  beforeEach(() => {
    token = new User().generateAuthToken();
  });
  it("should return status 401 if no token is passed.", async () => {
    token = "";
    const res = await exec();
    expect(res.status).to.equal(401);
  });
  it("should return status 400 if invalid token is passed.", async () => {
    token = "123";
    const res = await exec();
    expect(res.status).to.equal(400);
  });
  it("should return status 200 if a valid token is passed.", async () => {
    const res = await exec();
    expect(res.status).to.equal(200);
  });
});
