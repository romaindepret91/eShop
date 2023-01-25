import User from "../../../models/user";
import request from "supertest";
import bcrypt from "bcrypt";

describe("Sessions", () => {
  let server;
  let payload;

  const execute = async () => {
    return await request(server).post("/api/sessions").send(payload);
  };

  beforeEach(async () => {
    server = require("../../../index");
    const salt = await bcrypt.genSalt(12);
    const password = await bcrypt.hash("aaaaaaA1", salt);
    await User.collection.insertOne({
      email: "session@session.com",
      password: password,
    });
  });

  afterEach(async () => {
    await server.close();
    await User.collection.deleteOne({ email: "session@session.com" });
  });

  describe("startSession", () => {
    it("should return 400 if credentials are unvalid", async () => {
      payload = {};
      const res = await execute();
      expect(res.status).toBe(400);
    });
    it("should return 400 if user does not exist in DB", async () => {
      payload = { email: "session2@session.com", password: "aaaaaaA1" };
      const res = await execute();
      expect(res.status).toBe(400);
    });
    it("should return 400 if password sent is wrong", async () => {
      payload = { email: "session@session.com", password: "aaaaaaA2" };
      const res = await execute();
      expect(res.status).toBe(400);
    });
    it("should return user with token if authentication succeeds", async () => {
      payload = { email: "session@session.com", password: "aaaaaaA1" };
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body.authToken).not.toBe(null);
      expect(res.body.user.email === payload.email).toBeTruthy;
    });
  });
});
