module.exports = {
  // Use Node environment for backend tests (fixes TextEncoder error)
  testEnvironment: 'jsdom',

  // Setup file to define TextEncoder/TextDecoder globally
  setupFiles: ['<rootDir>/jest.setup.js'],

  // Files to collect coverage from
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!jest.config.js',
    '!coverage/**'
  ],

  // Test files to match
  testMatch: [
    '**/__tests__/**/*.test.js'
  ],

  // Supported file extensions
  moduleFileExtensions: ['js', 'json'],

  // Coverage reporting
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],

  // Ensure the process exits after tests
  forceExit: true,
  detectOpenHandles: false
};
