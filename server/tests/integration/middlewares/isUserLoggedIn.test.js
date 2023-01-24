import User from "../../../models/user";
import Category from "../../../models/category";
import request from "supertest";

describe("isUserLoggedIn", () => {
  let server;
  let authToken;
  let user;

  const execute = () => {
    return request(server)
      .post("/api/categories")
      .set("authToken", authToken)
      .send({ name: "new category" });
  };
  beforeEach(async () => {
    server = require("../../../index");
    user = new User({ isAdmin: true, email: "user@user.com" });
    authToken = user.generateAuthToken();
    await User.collection.insertOne(user);
  });
  afterEach(async () => {
    await server.close();
    await User.findByIdAndRemove(user._id);
    await Category.findOneAndRemove({ slug: "new-category" });
  });

  it("should return 401 if no token is provided", async () => {
    authToken = "";
    const res = await execute();
    expect(res.status).toBe(401);
  });
  it("should return 400 if token is invalid", async () => {
    authToken = "a";
    const res = await execute();
    expect(res.status).toBe(400);
  });
  it("should return 400 if user not found in DB", async () => {
    authToken = new User().generateAuthToken();
    const res = await execute();
    expect(res.status).toBe(400);
  });
  it("should return 200 if token is valid", async () => {
    const res = await execute();
    expect(res.status).toBe(200);
  });
});
