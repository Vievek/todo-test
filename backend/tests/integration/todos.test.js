import request from "supertest";
import app from "../../server.js";
import Todo from "../../models/Todo.js";
import User from "../../models/User.js";
import jwt from "jsonwebtoken";

describe("Todo API", () => {
  let token;
  let userId;

  beforeAll(async () => {
    await Todo.deleteMany({});

    // Create test user
    const user = await User.create({
      username: "todotestuser",
      password: "testpass123",
    });

    userId = user._id;
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  });

  it("GET /api/todos should return empty array initially", async () => {
    const res = await request(app)
      .get("/api/todos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([]);
  });

  it("POST /api/todos should create a new todo", async () => {
    const res = await request(app)
      .post("/api/todos")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Test Todo",
        completed: false,
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("title", "Test Todo");
  });

  it("GET /api/todos should return the created todo", async () => {
    const res = await request(app)
      .get("/api/todos")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0]).toHaveProperty("title", "Test Todo");
  });
});
