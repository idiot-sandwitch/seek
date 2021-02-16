const request = require("supertest");
const expect = require("chai").expect;
const { User } = require("../../../models/user");
const { VerificationToken } = require("../../../models/verification");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

describe("user route endpoint", () => {
  let server;
  beforeEach(async () => {
    server = require("../../../server");
    await User.find().deleteMany();
    await VerificationToken.find().deleteMany();
  });
  afterEach(async () => {
    await server.close();
    await User.find().deleteMany();
    await VerificationToken.find().deleteMany();
  });

  describe("GET /me", () => {
    it("should return user's details if valid token is passed.", async () => {
      let name = "12345",
        email = "123@123.com",
        password = "lU-12345";
      const user = new User({ name, email, password });
      await user.save();
      const token = user.generateAuthToken();
      const res = await request(server)
        .get("/api/users/me")
        .set(process.env.JWT_HEADER, token)
        .send();
      expect(res.status).to.equal(200);
      expect(res.body).to.have.deep.property("_id");
      expect(res.body).to.have.deep.property("name", name);
      expect(res.body).to.have.deep.property("email", email);
      expect(res.body).to.not.have.deep.property("password", password);
    });
  });
  describe("POST /add", function () {
    this.timeout(10000);
    let name;
    let email;
    let password;
    beforeEach(() => {
      (name = "12345"), (email = "123@123.com"), (password = "lU-12345"); //stands for lowercase uppercase and a character and a number combination.
    });
    const exec = () => {
      return request(server)
        .post("/api/users/add")
        .send({ name, email, password });
    };
    it("should return 400 if name is not passed.", async () => {
      const res = await request(server).post("/api/users/add").send({
        email,
        password,
      });
      expect(res.status).to.equal(400);
    });
    it("should return 400 if email is not passed.", async () => {
      const res = await request(server).post("/api/users/add").send({
        name,
        password,
      });
      expect(res.status).to.equal(400);
    });
    it("should return 400 if password is not passed.", async () => {
      const res = await request(server).post("/api/users/add").send({
        name,
        email,
      });
      expect(res.status).to.equal(400);
    });
    it("should return 400 if user already exists.", async () => {
      const user = new User({ name, email, password });
      await user.save();
      const res = await exec();
      expect(res.status).to.equal(400);
    });
    it("should hash the password correctly before saving it if valid body is passed.", async () => {
      await exec();
      const user = await User.findOne({ email });
      const valid = await bcrypt.compare(password, user.password);
      expect(user.password).to.not.deep.equal(password);
      expect(valid).to.be.true;
    });
    it("should create a validation token with the user's reference if valid body is passed.", async () => {
      await exec();
      const user = await User.findOne({ email });
      const verificationToken = await VerificationToken.findOne({
        user: user._id,
      });
      expect(verificationToken).to.not.be.undefined;
    });
    it("should save the user if valid body is passed.", async () => {
      await exec();
      const user = await User.findOne({ email });
      expect(user).to.have.deep.property("name", name);
      expect(user).to.have.deep.property("email", email);
      expect(user).to.have.deep.property("password");
    });
    it("should return 200 if valid body is passed.", async () => {
      const res = await exec();
      expect(res.status).to.equal(200);
    });
  });
  describe("PUT /resetPassword", function () {
    this.timeout(10000);
    let token, user, salt;
    let name, email, password;
    let old_password, new_password;
    beforeEach(async () => {
      name = "12345";
      email = "123@123.com";
      old_password = "old-Password123";
      salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(old_password, salt);
      user = new User({ name, email, password, isVerified: true });
      user = await user.save();
      token = user.generateAuthToken();
      new_password = "new-Password123";
    });
    const exec = () => {
      return request(server)
        .put("/api/users/resetPassword")
        .set(process.env.JWT_HEADER, token)
        .send({ old_password, new_password });
    };
    it("should return 401 if no token is passed.", async () => {
      const res = await request(server).put("/api/users/resetPassword").send();
      expect(res.status).to.equal(401);
    });
    it("should return 400 if old password is incorrect.", async () => {
      old_password = "not-Old-password";
      const res = await exec();
      expect(res.status).to.equal(400);
    });
    it("should update the password in the databse if valid body is passed.", async () => {
      await exec();
      user = await User.findById(user._id);
      const updated = await bcrypt.compare(new_password, user.password);
      expect(updated).to.be.true;
    });
    it("should return 200 if valid body is passed.", async () => {
      const res = await exec();
      expect(res.status).to.equal(200);
    });
  });
});
