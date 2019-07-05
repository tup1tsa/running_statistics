module.exports = {
  rootDir: "../../",
  collectCoverageFrom: [
    "<rootDir>/src/**/*.ts",
    "!<rootDir>/src/sandbox/**/*.ts",
    "!<rootDir>/src/index.ts",
    "!<rootDir>/src/application/config.ts"
  ],
  testMatch: ["<rootDir>/src/__tests__/**/*.ts"],
  testPathIgnorePatterns: ["<rootDir>/src/__tests__/helpers.ts"],
  testEnvironment: "node",
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  transformIgnorePatterns: [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|ts|tsx)$"
  ],
  moduleFileExtensions: ["ts", "js"],
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json"
    }
  }
};
