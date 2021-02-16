const expect = require("chai").expect;
const mongoose = require("mongoose");
const _ = require("lodash");
const {
  pickResourcePostData,
  validateResourcePost,
} = require("../../../models/resourcePost");

describe("resourcePost model", () => {
  let title, content, authorId;
  const payload = () => {
    return { title, content, authorId };
  };

  beforeEach(() => {
    title = "title";
    content = "good content";
    authorId = new mongoose.Types.ObjectId().toHexString();
  });

  describe("pickData", () => {
    it("should return only the required properties.", () => {
      const load = payload();
      load.test = "test";
      const result = pickResourcePostData(load);
      expect(result.test).to.be.undefined;
      expect(result.title).not.to.be.undefined;
    });
  });

  describe("validatePost", () => {
    it("should return an error if one or many of the properties not defined.", () => {
      Object.keys(payload()).forEach((key) => {
        const { error } = validateResourcePost(_.omit(payload(), [key]));
        expect(error).to.not.be.undefined;
      });
    });

    it("should return an error if types don't match.", () => {
      Object.keys(payload()).forEach((key) => {
        const load = payload();
        if (typeof load[key] !== "number") load[key] = 1;
        else load[key] = "1";

        const { error } = validateResourcePost(load);
        expect(error).to.not.be.undefined;
      });
    });

    it("should return an error if title less than 3 chars.", () => {
      title = "F";
      const { error } = validateResourcePost(payload());
      expect(error).to.not.be.undefined;
    });

    it("should return an error if title more than 150 chars.", () => {
      title = "F".repeat(151);
      const { error } = validateResourcePost(payload());
      expect(error).to.not.be.undefined;
    });

    it("should return an error if content less than 1 char.", () => {
      content = "";
      const { error } = validateResourcePost(payload());
      expect(error).to.not.be.undefined;
    });

    it("should return no errors if valid data passed.", () => {
      const { error } = validateResourcePost(payload());
      expect(error).to.be.undefined;
    });
  });
});
