import * as userService from "../services/user.service";
import app from "../app";
import mongoose from "mongoose";
import supertest from "supertest";
import { getJwtToken } from "../controllers/auth/auth.controller";
const userInput = {
  email: "bissoujounnefri-4@yopmail.com",
  password: "12345678",
};

const userId = new mongoose.Types.ObjectId().toString();
const userPayload = {
  email: "bissoujounnefri-5@yopmail.com",
  noteCount: 0,
  _id: userId,
};

describe("user", () => {
  describe("user registration", () => {
    it("should return 201 statusCode", async () => {
      const createUserServiceMock = jest
        .spyOn(userService, "createUser")
        //@ts-ignore
        .mockReturnValueOnce(userPayload); //https://jestjs.io/docs/mock-function-api#mockfnmockreturnvalueoncevalue
      const { statusCode, body } = await supertest(app)
        .post("/api/auth/signup")
        .send(userInput);
      expect(statusCode).toEqual(201);
      expect(createUserServiceMock).toHaveBeenCalledTimes(1);
    });

    it("should return 409 user already exists", async () => {
      const createUserServiceMock = jest
        .spyOn(userService, "createUser")
        //@ts-ignore
        .mockRejectedValueOnce({
          index: 0,
          code: 11000,
          keyPattern: {
            email: 1,
          },
          keyValue: {
            email: "bissoujounnefri-1@yopmail.com",
          },
        });
      const { statusCode, body } = await supertest(app)
        .post("/api/auth/signup")
        .send(userInput);
      expect(statusCode).toBe(409);
      expect(body.status).toBe("Data exists");
    });

    it("should be log in for a existing user", async () => {
      const logInInput = {
        email: "bissoujounnefri-2@yopmail.com",
        password: "12345678",
      };
      const logInPayload = {
        user: {
          _id: new mongoose.Types.ObjectId().toString(),
          email: "bissoujounnefri-2@yopmail.com",
          noteCount: 16,
        },
      };
      const validateEmailAndPasswordServiceMock = jest
        .spyOn(userService, "validateEmailAndPassword")
        //@ts-ignore
        .mockReturnValueOnce(logInPayload);

      const { statusCode, body } = await supertest(app)
        .post("/api/auth/login")
        .send(logInInput);
      expect(validateEmailAndPasswordServiceMock).toHaveBeenCalled();
      expect(statusCode).toBe(200);
      expect(body.message).toBe("login successful");
    });

    it("Should be able to access protected route with valid jwt", async () => {
      const payload = new mongoose.Types.ObjectId().toString();
      const jwt = getJwtToken(payload);
      const findUserByIdPayload = {
        _id: payload,
        email: "bissoujounnefri-1@yopmail.com",
      };
      const findUserByIdMock = jest
        .spyOn(userService, "findUserById")
        //@ts-ignore
        .mockReturnValueOnce(findUserByIdPayload);

      const { statusCode, body } = await supertest(app)
        .post("/api/auth/test")
        .set("Authorization", `Bearer ${jwt}`);

      // console.log(statusCode);
      expect(statusCode).toBe(200);
    });
  });
});
