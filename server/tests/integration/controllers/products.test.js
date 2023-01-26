import request from "supertest";
import Product from "../../../models/product";
import User from "../../../models/user";

describe("Products", () => {
  let server;
  let authToken;
  let user;

  beforeEach(async () => {
    server = require("../../../index");
    user = new User({ isAdmin: true, email: "products@products.com" });
    authToken = user.generateAuthToken();
    await User.collection.insertOne(user);
  });

  afterEach(async () => {
    await server.close();
    await User.findByIdAndRemove(user._id);
  });

  describe("createProduct", () => {
    it("shoudl return 400 if unvalid data sent", () => {});
  });
});
