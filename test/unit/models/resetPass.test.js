const { validatePassReset } = require("../../../models/resetPass");
const expect = require("chai").expect;

describe("resetPass OTP model.", () => {
  describe("validate", () => {
    it("should return error if no otp is passed.", async () => {
      const { error } = validatePassReset({});
      expect(error).to.not.be.undefined;
    });
    it("shold return an error if empty otp is passed", async () => {
      const { error } = validatePassReset({ otp: "" });
      expect(error).to.not.be.undefined;
    });
    it("shold return an error if extra arguments are passed.", async () => {
      const { error } = validatePassReset({ otp: "123", arg1: "123" });
      expect(error).to.not.be.undefined;
    });
    it("shold return error if otp is less than 8 characters.", async () => {
      const { error } = validatePassReset({ otp: "1234567" });
      expect(error).to.not.be.undefined;
    });
    it("shold return error if otp is more than 8 characters.", async () => {
      const { error } = validatePassReset({ otp: "123456789" });
      expect(error).to.not.be.undefined;
    });
    it("shold return error if otp type is not string", async () => {
      const { error } = validatePassReset({ otp: 12345678 });
      expect(error).to.not.be.undefined;
    });
    it("shold return no errors if valid data is passed.", async () => {
      const { error } = validatePassReset({ otp: "12345678" });
      expect(error).to.be.undefined;
    });
  });
});
