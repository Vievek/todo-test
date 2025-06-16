import request from "supertest";
import app from "../../server.js";
import User from "../../models/User.js";

describe("Auth API", () => {
  beforeAll(async () => {
    await User.deleteMany({});
  });

  describe("POST /api/auth/register", () => {
    it("should register a new user", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "testuser",
        password: "testpass123",
      });

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty("token");
    });

    it("should fail with missing credentials", async () => {
      const res = await request(app).post("/api/auth/register").send({
        username: "",
        password: "",
      });

      expect(res.statusCode).toEqual(400);
    });
  });

  describe("POST /api/auth/login", () => {
    it("should login an existing user", async () => {
      const res = await request(app).post("/api/auth/login").send({
        username: "testuser",
        password: "testpass123",
      });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("token");
    });

    it("should fail with invalid credentials", async () => {
      const res = await request(app).post("/api/auth/login").send({
        username: "testuser",
        password: "wrongpass",
      });

      expect(res.statusCode).toEqual(400);
    });
  });
});
