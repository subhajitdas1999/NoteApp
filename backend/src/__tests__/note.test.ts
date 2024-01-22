import mongoose from "mongoose";
import app from "../app";
import * as userService from "../services/user.service";
import { getJwtToken } from "../controllers/auth/auth.controller";
import supertest from "supertest";

describe("Notes", () => {
  describe("Get Notes", () => {
    it("Should block for rate limiting", async () => {
      const payload = new mongoose.Types.ObjectId().toString();
      const jwt = getJwtToken(payload);
      const findUserByIdPayload = {
        _id: payload,
        email: "bissoujounnefri-1@yopmail.com",
      };
      jest
        .spyOn(userService, "findUserById")
        //@ts-ignore
        .mockReturnValue(findUserByIdPayload);
      for (let i = 0; i < 50; i++) {
        await supertest(app)
          .post("/api/auth/test")
          .set("Authorization", `Bearer ${jwt}`);
      }

      const { statusCode, body } = await supertest(app)
        .post("/api/auth/test")
        .set("Authorization", `Bearer ${jwt}`);
      expect(statusCode).toBe(429);
    });
  });
});
