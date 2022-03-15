import type {Config} from '@jest/types';

export = {
    preset: "ts-jest",
    testEnvironment: "node",
    setupFiles: ["dotenv/config"],
    transform: {
      '^.+\\.ts': 'ts-jest',
    },
    
    // Code coverage
    collectCoverage: false,
    coverageDirectory: "coverage",
  
    // Code coverage for automated builds
    coverageThreshold: {
      global: {
        branches: 90,
        function: 90,
        lines: 90,
        statements: 90
      }
    },
  
    // Test coverage threshold
    verbose: true,
    testPathIgnorePatterns: ["/node_modules"],
    roots: ["<rootDir>/tests"],
    globalSetup: "<rootDir>/tests/setup.ts",
    globalTeardown: "<rootDir>/tests/teardown.ts"
}
