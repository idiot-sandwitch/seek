const randomString = require("randomstring");
const { validateVerification } = require("../../../models/verification");
const expect = require("chai").expect;

describe("verification model", () => {
  describe("validate", () => {
    it("should return an error if no token is passed.", () => {
      const { error } = validateVerification({});
      expect(error).to.not.be.undefined;
    });
    it("should return an error if empty token is passed.", () => {
      const { error } = validateVerification({ token: "" });
      expect(error).to.not.be.undefined;
    });
    it("should return an error if token length is less than 128 chars.", () => {
      const { error } = validateVerification({ token: "1234" });
      expect(error).to.not.be.undefined;
    });
    it("should return an error if token length is more than 128 chars.", () => {
      const { error } = validateVerification({ token: "1".repeat(129) });
      expect(error).to.not.be.undefined;
    });
    it("should return an error if token type is invalid.", () => {
      const { error } = validateVerification({ token: 1234 });
      expect(error).to.not.be.undefined;
    });
    it("should return an error if extra arguments are passed.", () => {
      const { error } = validateVerification({ token: "", arg1: "2" });
      expect(error).to.not.be.undefined;
    });
    it("should return no errors if valid token is passed.", () => {
      const { error } = validateVerification({
        token: randomString.generate(128),
      });
      expect(error).to.be.undefined;
    });
  });
});
