import request from "supertest";
import app from "./index";

describe("POST /users", () => {
  describe("given a username and password", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request(app).post("/auth/login").send({
        email: "nati@gmail.com",
        password: "aa9432651",
      });
      expect(response.statusCode).toBe(200);
    });
  });
});
