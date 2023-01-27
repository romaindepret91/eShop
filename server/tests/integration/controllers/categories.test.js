import User from "../../../models/user";
import Category from "../../../models/category";
import request from "supertest";
import mongoose from "mongoose";

describe("Categories", () => {
  let server;
  let authToken;
  let user;

  beforeEach(async () => {
    server = require("../../../index");
    user = new User({ isAdmin: true, email: "categories@categories.com" });
    authToken = user.generateAuthToken();
    await User.collection.insertOne(user);
    await Category.collection.insertMany([
      { name: "category 1", slug: "category-1" },
      { name: "category 2", slug: "category-2" },
    ]);
  });

  afterEach(async () => {
    await server.close();
    await User.findByIdAndRemove(user._id);
    await Category.deleteMany({
      slug: {
        $in: ["category-1", "category-2", "category-3", "category-4"],
      },
    });
  });

  describe("getCategories", () => {
    it("should return all categories", async () => {
      const res = await request(server)
        .get("/api/categories")
        .set("authToken", authToken);

      expect(res.status).toBe(200);
      expect(res.body.some((cat) => cat.slug === "category-1")).toBeTruthy;
      expect(res.body.some((cat) => cat.slug === "category-2")).toBeTruthy;
    });
  });

  describe("getOneCategory", () => {
    it("should return 404 if category does not exist", async () => {
      const res = await request(server)
        .get("/api/categories/category-3")
        .set("authToken", authToken);
      expect(res.status).toBe(404);
    });

    it("should return the category if exists", async () => {
      const res = await request(server)
        .get("/api/categories/category-1")
        .set("authToken", authToken);
      expect(res.status).toBe(200);
      expect(res.body.slug === "category-1");
    });
  });

  describe("deleteCategory", () => {
    let id;
    const execute = async () => {
      return await request(server)
        .delete(`/api/categories/${id}`)
        .set("authToken", authToken);
    };

    it("should return 400 if id not valid", async () => {
      id = "a";
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should 404 if category does not exist", async () => {
      id = mongoose.Types.ObjectId();
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should return the deleted category if category has been deleted successfully", async () => {
      const category = await request(server)
        .get("/api/categories/category-1")
        .set("authToken", authToken);
      id = category.body._id;

      const res = await execute();

      expect(res.status).toBe(200);
      expect(res.body._id === id);
      expect(res.body.slug === "category-1");
    });
  });

  describe("createCategory", () => {
    let payload;
    const execute = async () => {
      return await request(server)
        .post("/api/categories")
        .set("authToken", authToken)
        .send(payload);
    };

    it("should return 400 if payload is not a valid category", async () => {
      payload = {};
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 400 if category already exists", async () => {
      payload = { name: "category 1" };
      const res = await execute();
      expect(res.status).toBe(400);
      expect(res.text).toBe("Category name already taken");
    });

    it("should save the category in DB if valid", async () => {
      payload = { name: "category 3" };
      await execute();
      const newCategory = await Category.findOne({ slug: "category-3" });

      expect(newCategory).not.toBe(null);
    });

    it("should return the category if valid", async () => {
      payload = { name: "category 3" };
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body.slug === "category-3");
    });
  });

  describe("updateCategory", () => {
    let id;
    let payload;
    const execute = async () => {
      return await request(server)
        .put(`/api/categories/${id}`)
        .set("authToken", authToken)
        .send(payload);
    };

    const getCategoryToUpdate = async () => {
      return await request(server)
        .get("/api/categories/category-1")
        .set("authToken", authToken);
    };

    it("should return 400 if id not valid", async () => {
      id = "a";
      payload = { name: "category 4" };
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 400 if payload is not a valid category", async () => {
      const category = await getCategoryToUpdate();
      id = category.body._id;
      payload = {};
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 400 if category name sent in payload already exists", async () => {
      const category = await getCategoryToUpdate();
      id = category.body._id;
      payload = { name: "category 2" };
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should 404 if category to update (id) does not exist", async () => {
      id = mongoose.Types.ObjectId();
      payload = { name: "category 4" };
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should update the category if valid", async () => {
      const category = await getCategoryToUpdate();
      id = category.body._id;
      payload = { name: "category 4" };
      await execute();
      const updatedCategory = await Category.findById(id);
      expect(updatedCategory).not.toBe(null);
      expect(updatedCategory.slug === "category-4");
    });

    it("should return the category if valid", async () => {
      const category = await getCategoryToUpdate();
      id = category.body._id;
      payload = { name: "category 4" };
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body.slug === "category-4");
    });
  });
});
