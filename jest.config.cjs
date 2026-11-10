module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.js"],
  moduleNameMapper: {
    "\\.(css|less|scss)$": "<rootDir>/src/tests/styleMock.js",
  },
  testMatch: ["<rootDir>/src/tests/**/*.test.jsx"],
};
