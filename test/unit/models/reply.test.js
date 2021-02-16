const expect = require("chai").expect;
const mongoose = require("mongoose");
const _ = require("lodash");
const { ResourcePost } = require("../../../models/resourcePost");
const {
  Reply,
  validateReply,
  pickReplyData,
} = require("../../../models/reply");

describe("reply model", () => {
  let id, contentType, authorId, content;
  const ofTypes = [
    ResourcePost.collection.collectionName,
    Reply.collection.collectionName,
  ];

  const payload = () => {
    return { of: { id, contentType }, authorId, content };
  };

  beforeEach(() => {
    id = new mongoose.Types.ObjectId().toHexString();
    contentType = _.sample(ofTypes);
    authorId = new mongoose.Types.ObjectId().toHexString();
    content = "content";
  });

  describe("pickData", () => {
    it("should return only the required properties.", () => {
      const load = payload();
      load.test = "test";
      load.of.test = "test";
      const result = pickReplyData(load);
      expect(result.test).to.be.undefined;
      expect(result.of.test).to.be.undefined;
      expect(result.content).not.to.be.undefined;
      expect(result.of.id).not.to.be.undefined;
    });
  });

  describe("validate", () => {
    it("should return an error if one or many of the properties not defined.", () => {
      Object.keys(payload()).forEach((key) => {
        const { error } = validateReply(_.omit(payload(), [key]));
        expect(error).to.not.be.undefined;
      });

      Object.keys(payload().of).forEach((key) => {
        const load = payload();
        load.of = _.omit(load.of, [key]);
        const { error } = validateReply(load);
        expect(error).to.not.be.undefined;
      });
    });

    it("should return an error if types don't match.", () => {
      Object.keys(payload()).forEach((key) => {
        const load = payload();
        if (typeof load[key] !== "number") load[key] = 1;
        else load[key] = "1";

        const { error } = validateReply(load);
        expect(error).to.not.be.undefined;
      });

      Object.keys(payload().of).forEach((key) => {
        const load = payload();
        if (typeof load.of[key] !== "number") load.of[key] = 1;
        else load.of[key] = "1";

        const { error } = validateReply(load);
        expect(error).to.not.be.undefined;
      });
    });

    it("should return an error if content length less than 1.", () => {
      content = "";
      const { error } = validateReply(payload());
      expect(error).to.not.be.undefined;
    });

    it("should return an error if contentType not in ofTypes enum.", () => {
      contentType = "LMAO";
      const { error } = validateReply(payload());
      expect(error).to.not.be.undefined;
    });

    it("should return no errors if valid data passed.", () => {
      const { error } = validateReply(payload());
      expect(error).to.be.undefined;
    });
  });
});
