let server;

describe("Categories", () => {
  beforeEach(async () => {
    server = require("../../../index");
  });
  afterEach(async () => {
    await server.close();
  });
  describe("GET /", () => {
    it("should return all categories", () => {});
  });
});
