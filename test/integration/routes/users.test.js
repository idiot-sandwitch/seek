const request = require("supertest");
const expect = require("chai").expect;
const { User } = require("../../../models/user");
const { VerificationToken } = require("../../../models/verification");
const bcrypt = require("bcryptjs");

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
  describe("POST /add", () => {
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
});
