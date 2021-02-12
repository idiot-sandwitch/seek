require("dotenv").config();
const { User } = require("../../../models/user");
const { VerificationToken } = require("../../../models/verification");
const randomString = require("randomstring");
const request = require("supertest");
let server;
const expect = require("chai").expect;

describe("verify user route.", () => {
  beforeEach(async () => {
    server = require("../../../server");
    await User.find().deleteMany();
  });
  afterEach(async () => {
    server.close();
    await User.find().deleteMany();
  });

  describe("POST /", () => {
    let token;
    let user;
    let verificationToken;
    const exec = () => {
      return request(server).post("/api/verify").send({ token });
    };
    beforeEach(async () => {
      token = randomString.generate(128);
      user = new User({
        name: "user1",
        email: "user1@users.com",
        password: "12345",
      });
      await user.save();
      verificationToken = new VerificationToken({
        token: token,
        user: user._id,
      });
      await verificationToken.save();
    });
    it("should return an error if no token is passed.", async () => {
      token = "";
      const res = await exec();
      expect(res.status).to.equal(400);
    });
    it("should return 401 if an invalid token is passed.", async () => {
      token = randomString.generate(128);
      const res = await exec();
      expect(res.status).to.equal(401);
    });
    it("should return 404 if valid token of invalid user is passed.", async () => {
      await User.findByIdAndDelete(verificationToken.user);
      const res = await exec();
      expect(res.status).to.equal(404);
    });
    it("should return 200 if valid token of valid user is passed.", async () => {
      const res = await exec();
      expect(res.status).to.equal(200);
    });
    it("should update referenced user if valid token of valid user is passed.", async () => {
      const res = await exec();
      user = await User.findById(user._id);
      expect(user.isVerified).to.be.true;
    });
    it("should delete current token if valid token of valid user is passed.", async () => {
      const res = await exec();
      verificationToken = await VerificationToken.findOne({ token });
      expect(verificationToken).to.be.null;
    });
  });
});
