import User from "../../../models/user";
import Category from "../../../models/category";
import request from "supertest";

describe("isAdmin", () => {
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
    user = new User({ isAdmin: true, email: "admin@admin.com" });
    authToken = user.generateAuthToken();
    await User.collection.insertOne(user);
  });
  afterEach(async () => {
    await Category.findOneAndRemove({ slug: "new-category" });
    await User.findByIdAndRemove(user._id);
    await server.close();
  });
  it("should return 200 if user is admin", async () => {
    const res = await execute();
    expect(res.status).toBe(200);
  });
  it("should return 401 if user is not admin", async () => {
    user.isAdmin = false;
    authToken = user.generateAuthToken();
    user = await User.findByIdAndUpdate(user._id, { isAdmin: false });
    const res = await execute();
    expect(res.status).toBe(401);
  });
});
