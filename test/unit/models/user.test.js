const expect = require("chai").expect;
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const _ = require("lodash");
const {
  User,
  pickUserData,
  validateData,
  validateUser,
  validateEditUser,
  validateLogin,
  validatePassReset,
  validateForgotPass,
  validateSetNewPass,
} = require("../../../models/user");

describe("user model", () => {
  let name, email, password, avatar;
  const payload = () => {
    return { name, email, password, avatar };
  };

  beforeEach(async () => {
    name = "fake";
    email = "fake@gmail.com";
    password = "this.isFake.1";
    avatar =
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80";
    await User.find().deleteMany();
  });
  afterEach(async () => {
    await User.find().deleteMany();
  });

  describe("user.generateAuthToken", () => {
    it("should return a valid JWT.", () => {
      const payload = { _id: new mongoose.Types.ObjectId() };
      const user = new User(payload);
      const token = user.generateAuthToken();
      const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
      expect(decoded._id).to.not.be.undefined;
      expect(decoded.test).to.be.undefined;
    });
  });

  describe("pickdata", () => {
    it("should return only the required properties.", () => {
      const load = payload();
      load.test = "test";
      const result = pickUserData(load);
      expect(result.test).to.be.undefined;
      expect(result.email).not.to.be.undefined;
    });
  });

  describe("validateData", () => {
    it("should return an error if types don't match.", () => {
      Object.keys(payload()).forEach((key) => {
        const load = payload();
        if (typeof load[key] !== "number") load[key] = 1;
        else load[key] = "1";

        const { error } = validateData(load);
        expect(error).to.not.be.undefined;
      });
    });

    it("should return an error if name less than 4 chars.", () => {
      name = "F";
      const { error } = validateData(payload());
      expect(error).to.not.be.undefined;
    });

    it("should return an error if name more than 50 chars.", () => {
      name = "F".repeat(51);
      const { error } = validateData(payload());
      expect(error).to.not.be.undefined;
    });

    it("should return an error if email less than 7 chars.", () => {
      email = "k@i.in";
      const { error } = validateData(payload());
      expect(error).to.not.be.undefined;
    });

    it("should return an error if email more than 255 chars.", () => {
      email = "F".repeat(255) + "@gola.com";
      const { error } = validateData(payload());
      expect(error).to.not.be.undefined;
    });

    it("should return an error if invalid email.", () => {
      email = "F".repeat(10);
      const { error } = validateData(payload());
      expect(error).to.not.be.undefined;
    });
    it("should return an error if password doesn't meet the complexity requirements.", () => {
      const invalidPasswords = [
        "1",
        "1".repeat(1025),
        "12345",
        "abcde",
        "ABCDE",
        "@@@@@",
        "aBCDe",
        "abcd12",
        "abc@de",
        "ABCD12",
        "ABC@DE",
        "123@45",
      ];
      invalidPasswords.forEach((pass) => {
        password = pass;
        const { error } = validateData(payload());
        expect(error).to.not.be.undefined;
      });
    });
    it("should return no errors if valid data passed.", () => {
      const { error } = validateData(payload());
      expect(error).to.be.undefined;
    });
  });

  describe("validateUser", () => {
    const fields = ["name", "email", "password"];
    it("should return an error if one or many of the properties not defined.", () => {
      Object.keys(payload()).forEach((key) => {
        if (!fields.includes(key)) return;
        const { error } = validateUser(
          _.omit(_.pick(payload(), fields), [key])
        );
        expect(error).to.not.be.undefined;
      });
    });

    //TODO: check if validateData function is being called

    it("should return no errors if valid data passed.", () => {
      const { error } = validateUser(_.pick(payload(), fields));
      expect(error).to.be.undefined;
    });
  });

  describe("validateEditUser", () => {
    const fields = ["name", "avatar"];
    it("should return an error if one or many of the properties not defined.", () => {
      Object.keys(payload()).forEach((key) => {
        if (!fields.includes(key)) return;
        const { error } = validateEditUser(
          _.omit(_.pick(payload(), fields), [key])
        );
        expect(error).to.not.be.undefined;
      });
    });

    //TODO: check if validateData function is being called

    it("should return no errors if valid data passed.", () => {
      const { error } = validateEditUser(_.pick(payload(), fields));
      expect(error).to.be.undefined;
    });
  });

  describe("validateLogin", () => {
    const fields = ["email", "password"];
    it("should return an error if one or many of the properties not defined.", () => {
      Object.keys(payload()).forEach((key) => {
        if (!fields.includes(key)) return;
        const { error } = validateLogin(
          _.omit(_.pick(payload(), fields), [key])
        );
        expect(error).to.not.be.undefined;
      });
    });

    it("should return an error if password less than 4 chars.", () => {
      password = "F";
      const { error } = validateLogin(_.pick(payload(), fields));
      expect(error).to.not.be.undefined;
    });

    it("should return an error if password more than 1024 chars.", () => {
      password = "F".repeat(1025);
      const { error } = validateLogin(_.pick(payload(), fields));
      expect(error).to.not.be.undefined;
    });

    //TODO: check if validateData function is being called

    it("should return no errors if valid data passed.", () => {
      const { error } = validateLogin(_.pick(payload(), fields));
      expect(error).to.be.undefined;
    });
  });

  describe("validatePassReset", () => {
    let old_password, new_password;
    let locPayload = () => {
      return { old_password, new_password };
    };
    let fields = ["old_password", "new_password"];
    it("should return an error if empty body is passed.", () => {
      const { error } = validatePassReset({});
      expect(error).to.not.be.undefined;
    });
    it("should return an error if old/new password(s) are omitted.", () => {
      Object.keys(locPayload()).forEach((key) => {
        if (!fields.includes(key)) return;
        const { error } = validateLogin(
          _.omit(_.pick(payload(), fields), [key])
        );
        expect(error).to.not.be.undefined;
      });
    });
    it("should return an error if new password doesn't meet the complexity requirements.", () => {
      const invalidPasswords = [
        "1",
        "1".repeat(1025),
        "12345",
        "abcde",
        "ABCDE",
        "@@@@@",
        "aBCDe",
        "abcd12",
        "abc@de",
        "ABCD12",
        "ABC@DE",
        "123@45",
      ];
      invalidPasswords.forEach((pass) => {
        const { error } = validatePassReset({
          old_password: "validPassword1",
          new_password: pass,
        });
        expect(error).to.not.be.undefined;
      });
    });
    it("should return an error if old and new passwords are the same.", () => {
      const { error } = validatePassReset({
        old_password: "oldPassword1",
        new_password: "oldPassword1",
      });
      expect(error).to.not.be.undefined;
    });
    it("should return an error if extra arguments are passed.", () => {
      const { error } = validatePassReset({
        old_password: "oldPassword1",
        new_password: "newPassword2",
        arg1: "12",
      });
      expect(error).to.not.be.undefined;
    });
    it("should return no errors if valid old and new passwords are passed.", () => {
      const { error } = validatePassReset({
        old_password: "oldPassword1",
        new_password: "newPassword2",
      });
      expect(error).to.be.undefined;
    });
  });

  describe("validateForgotPass", () => {
    it("should return an error if empty body is passed.", () => {
      const { error } = validateForgotPass({});
      expect(error).to.not.be.undefined;
    });
    it("should return an error if empty email address is passed.", () => {
      const { error } = validateForgotPass({ email: "" });
      expect(error).to.not.be.undefined;
    });
    it("should return an error invalid email address is passed.", () => {
      const { error } = validateForgotPass({ email: "123435" });
      expect(error).to.not.be.undefined;
    });
    it("should return an error if type does not match.", () => {
      const { error } = validateForgotPass({ email: 12345 });
      expect(error).to.not.be.undefined;
    });
    it("should return an error if extra arguments are passed.", () => {
      const { error } = validateForgotPass({
        email: "fake@fake.com",
        arg1: "12",
      });
      expect(error).to.not.be.undefined;
    });
    it("should return no errors if a valid email is passed.", () => {
      const { error } = validateForgotPass({ email: "fake@gmail.com" });
      expect(error).to.be.undefined;
    });
  });

  describe("validateSetNewPass", () => {
    let otp, password;
    let fields = ["otp", "password"];
    let locPayload = () => {
      return { otp, password };
    };
    it("should return an error if empty body is passed.", () => {
      const { error } = validateSetNewPass({});
      expect(error).to.not.be.undefined;
    });
    it("should return an error if any one of the arguments are omitted.", () => {
      Object.keys(locPayload()).forEach((key) => {
        if (!fields.includes(key)) return;
        const { error } = validateSetNewPass(
          _.omit(_.pick(payload(), fields), [key])
        );
        expect(error).to.not.be.undefined;
      });
    });
    it("should return an error if new password doesn't meet the complexity requirements.", () => {
      const invalidPasswords = [
        "1",
        "1".repeat(1025),
        "12345",
        "abcde",
        "ABCDE",
        "@@@@@",
        "aBCDe",
        "abcd12",
        "abc@de",
        "ABCD12",
        "ABC@DE",
        "123@45",
      ];
      invalidPasswords.forEach((pass) => {
        const { error } = validateSetNewPass({
          old_password: "validPassword1",
          new_password: pass,
        });
        expect(error).to.not.be.undefined;
      });
    });
    it("should return an error if extra arguments are passed.", () => {
      const { error } = validateSetNewPass({
        otp: "12345678",
        password: "newPassword2",
        arg1: "12",
      });
      expect(error).to.not.be.undefined;
    });
    it("should return no errors if valid otp and password is passed.", () => {
      const { error } = validateSetNewPass({
        otp: "12345678",
        password: "validPassword1",
      });
      expect(error).to.be.undefined;
    });
  });
});
