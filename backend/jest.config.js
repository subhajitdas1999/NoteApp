const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("./tsconfig");

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,
  clearMocks: true, //Automatically clear mock calls, instances, contexts and results before every test. Equivalent to calling jest.clearAllMocks() before each test. This does not remove any mock implementation that may have been provided.
  moduleNameMapper: {
    "^@models/(.*)$": "<rootDir>/src/models/$1",
    "^@routes/(.*)$": "<rootDir>/src/routes/$1",
    "^@controllers/(.*)$": "<rootDir>/src/controllers/$1",
    "^@middlewares/(.*)$": "<rootDir>/src/middlewares/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@validators/(.*)$": "<rootDir>/src/validators/$1",
  },
};
