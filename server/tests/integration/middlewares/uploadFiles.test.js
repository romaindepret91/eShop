import request from "supertest";
import path from "path";
import fs from "fs";
import User from "../../../models/user";

describe("uploadFiles", () => {
  let server;
  let authToken;
  let user;

  beforeEach(async () => {
    server = require("../../../index");
    user = new User({ isAdmin: true, email: "uploadFiles@uploadFiles.com" });
    authToken = user.generateAuthToken();
    await User.collection.insertOne(user);
  });

  afterEach(async () => {
    await server.close();
    await User.findByIdAndRemove(user._id);
  });

  it("should save the file received from client", async () => {
    // Send file to be uploaded
    const filePath = path.join(__dirname, "..", "testFiles", "test.jpg");
    const originalFile = fs.readFileSync(filePath);
    const res = await request(server)
      .post("/test-uploadFiles")
      .set("Content-Type", "multipart/form-data")
      .field({ user: JSON.stringify(user) })
      .attach("image1", filePath);

    // Check if file has been uploaded in correct directory
    let uploadedFile;
    let hasBeenUploaded = false;
    const filesDir = fs.opendirSync(
      `public/uploads/users/user-${user._id}/products`
    );

    for await (const entry of filesDir) {
      uploadedFile = fs.readFileSync(
        `public/uploads/users/user-${user._id}/products/${entry.name}`
      );
      if (uploadedFile.equals(originalFile)) {
        hasBeenUploaded = true;
        break;
      }
    }
    expect(res.status).toBe(200);
    expect(hasBeenUploaded).toBeTruthy();
  });
});
