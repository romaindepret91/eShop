import User from "../../../models/user";
import request from "supertest";
import bcrypt from "bcrypt";

describe("Users", () => {
  let server;

  beforeEach(async () => {
    server = require("../../../index");
    await User.collection.insertOne({
      email: "user1@user.com",
    });
  });

  afterEach(async () => {
    await server.close();
    await User.collection.deleteOne({ email: "user1@user.com" });
  });

  describe("createUser", () => {
    let payload;

    const execute = async () => {
      return await request(server).post("/api/users").send(payload);
    };

    it("should return 400 if data sent is unvalid", async () => {
      payload = {};
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 400 if email is already taken", async () => {
      payload = { email: "user1@user.com" };
      const res = await execute();

      expect(res.status).toBe(400);
    });

    it("should hash password and save user in DB if data sent is valid", async () => {
      payload = {
        username: "user2",
        email: "user2@user.com",
        password: "aaaaaaA1",
        password_confirmed: "aaaaaaA1",
        firstname: "user2",
        surname: "user2",
      };
      const res = await execute();

      const user = await User.collection.findOne({
        email: "user2@user.com",
      });
      const validPassword = await bcrypt.compare("aaaaaaA1", user.password);
      expect(user).not.toBe(null);
      expect(user.email === res.email).toBeTruthy;
      expect(validPassword).toBeTruthy;
      await User.collection.deleteOne({ email: "user2@user.com" });
    });

    it("should return user with authentication token", async () => {
      payload = {
        username: "user3",
        email: "user3@user.com",
        password: "aaaaaaA1",
        password_confirmed: "aaaaaaA1",
        firstname: "user3",
        surname: "user3",
      };
      const res = await execute();

      expect(res.status).toBe(200);
      expect(res.body.authToken).not.toBe(null);
      await User.collection.deleteOne({ email: "user3@user.com" });
    });
  });
});
