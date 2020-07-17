const supertest = require("supertest");
const server = require("./server.js");
const db = require("./data/dbConfig.js");

beforeEach(async () => {
  await db.seed.run();
});

describe("server.js", () => {
  it("should set the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });

  describe("POST /api/users", () => {
    it("should return 201 OK on successful post", async () => {
      let newUser = { name: "George", age: 30 };
      const res = await supertest(server)
        .post("/api/users")
        .send(newUser);
      expect(res.status).toBe(201);
    });

    it("should return 400 when missing age or name body data", async () => {
      let newUser1 = { age: 23 }; // missing name
      let newUser2 = { name: "stacy" }; // missing age

      const res1 = await supertest(server)
        .post("/api/users")
        .send(newUser1);
      expect(res1.status).toBe(400);

      const res2 = await supertest(server)
        .post("/api/users")
        .send(newUser2);
      expect(res2.status).toBe(400);
    });
  });

  describe("Delete /api/users/:id", () => {
    it("should return 200 when deleting valid user with specified id", async () => {
      const id = 1;
      const res = await supertest(server).delete(`/api/users/${id}`);
      expect(res.status).toBe(200);
    });

    it("should return 404 if user id is invalid", async () => {
      const id = 50;
      const res = await supertest(server).delete(`/api/users/${id}`);
      expect(res.status).toBe(404);
    });
  });
});
