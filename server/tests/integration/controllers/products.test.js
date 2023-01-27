import request from "supertest";
import Product from "../../../models/product";
import Category from "../../../models/category";
import User from "../../../models/user";
import mongoose from "mongoose";

describe("Products", () => {
  let server;
  let authToken;
  let user;
  let category;
  beforeEach(async () => {
    server = require("../../../index");
    user = new User({ isAdmin: true, email: "products@products.com" });
    category = new Category({ name: "category products test" });
    authToken = user.generateAuthToken();
    await User.collection.insertOne(user);
    await Category.collection.insertOne(category);
  });

  afterEach(async () => {
    await server.close();
    await User.findByIdAndRemove(user._id);
    await Category.findByIdAndRemove(category._id);
    await Product.deleteMany({});
  });

  describe("createProduct", () => {
    let payload;
    const execute = async () => {
      return await request(server)
        .post("/api/products")
        .set("authToken", authToken)
        .send(payload);
    };

    it("should return 400 if unvalid data sent", async () => {
      payload = {};
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 400 if category sent does not exist", async () => {
      payload = {
        name: "product0",
        brand: "brand0",
        description: "description0",
        price: 10,
        category: mongoose.Types.ObjectId(),
        stock: 1,
      };
      const res = await execute();
      expect(res.text).toBe('"Category" with given id not found');
      expect(res.status).toBe(400);
    });

    it("should save the product in DB if valid", async () => {
      payload = {
        name: "product1",
        brand: "brand1",
        description: "description1",
        price: 10,
        category: category._id,
        stock: 1,
      };
      await execute();
      const product = await Product.findOne({ name: "product1" });
      expect(product).not.toBe(null);
    });

    it("should return the saved product if valid", async () => {
      payload = {
        name: "product2",
        brand: "brand2",
        description: "description2",
        price: 10,
        category: category._id,
        stock: 1,
      };
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body.name === "product2");
    });
  });

  describe("getProducts", () => {
    const execute = async () => {
      return await request(server)
        .get("/api/products")
        .set("authToken", authToken);
    };

    it("should return all products", async () => {
      await Product.collection.insertMany([
        {
          name: "product3",
          brand: "brand3",
          description: "description3",
          price: 10,
          category: category._id,
          stock: 1,
        },
        {
          name: "product4",
          brand: "brand4",
          description: "description4",
          price: 10,
          category: category._id,
          stock: 1,
        },
      ]);
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body.some((prod) => prod.name === "product3")).toBeTruthy();
      expect(res.body.some((prod) => prod.name === "product4")).toBeTruthy();
    });
  });

  describe("getOneProduct", () => {
    let product;
    let slug;
    let id;

    const execute = async () => {
      return await request(server)
        .get(`/api/products/${slug}?id=${id}`)
        .set("authToken", authToken);
    };

    beforeEach(async () => {
      product = new Product({
        name: "product5",
        brand: "brand5",
        description: "description5",
        price: 10,
        category: category._id,
        stock: 1,
      });
      await Product.collection.insertOne(product);
    });

    it("should return 400 if product id not valid", async () => {
      slug = product.slug;
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 404 if product with given id not found", async () => {
      slug = product.slug;
      id = mongoose.Types.ObjectId();
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should return 400 if product id is valid but slug does not match records", async () => {
      slug = "a";
      id = product._id;
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return the product if request is valid", async () => {
      slug = product.slug;
      id = product._id;
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body._id === product._id);
    });
  });

  describe("deleteProduct", () => {
    let id;
    let product;

    const execute = async () => {
      return await request(server)
        .delete(`/api/products/${id}`)
        .set("authToken", authToken);
    };

    beforeEach(async () => {
      product = new Product({
        name: "product6",
        brand: "brand6",
        description: "description6",
        price: 10,
        category: category._id,
        stock: 1,
      });
      await Product.collection.insertOne(product);
    });

    it("should return 400 if product id not valid", async () => {
      id = "a";
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 404 if product does not exist", async () => {
      id = mongoose.Types.ObjectId();
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should return the deleted product if valid request", async () => {
      id = product._id;
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body._id === product._id);
    });
  });

  describe("updateProduct", () => {
    let id;
    let product;
    let payload;

    const execute = async () => {
      return await request(server)
        .put(`/api/products/${id}`)
        .set("authToken", authToken)
        .send(payload);
    };

    beforeEach(async () => {
      product = new Product({
        name: "product7",
        brand: "brand7",
        description: "description7",
        price: 10,
        category: category._id,
        stock: 1,
      });
      await Product.collection.insertOne(product);
    });

    it("should return 400 if product id not valid", async () => {
      id = "a";
      payload = {
        name: "product8",
        brand: "brand8",
        description: "description8",
        price: 10,
        category: category._id,
        stock: 1,
      };
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 400 if sent data not valid", async () => {
      id = product._id;
      payload = {};
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 400 if category id not valid", async () => {
      id = product._id;
      payload = {
        name: "product8",
        brand: "brand8",
        description: "description8",
        price: 10,
        category: mongoose.Types.ObjectId(),
        stock: 1,
      };
      const res = await execute();
      expect(res.status).toBe(400);
    });

    it("should return 404 if product does not exist", async () => {
      id = mongoose.Types.ObjectId();
      payload = {
        name: "product8",
        brand: "brand8",
        description: "description8",
        price: 10,
        category: category._id,
        stock: 1,
      };
      const res = await execute();
      expect(res.status).toBe(404);
    });

    it("should update the product in DB if valid request", async () => {
      id = product._id;
      payload = {
        name: "product8",
        brand: "brand8",
        description: "description8",
        price: 10,
        category: category._id,
        stock: 1,
      };
      await execute();
      const updatedProduct = await Product.findById(product._id);
      expect(updatedProduct).not.toBe(null);
      expect(payload.name === updatedProduct.name);
    });

    it("should return the updated product if valid request", async () => {
      id = product._id;
      payload = {
        name: "product9",
        brand: "brand9",
        description: "description9",
        price: 10,
        category: category._id,
        stock: 1,
      };
      const res = await execute();
      expect(res.status).toBe(200);
      expect(res.body.name === payload.name);
    });
  });
});
