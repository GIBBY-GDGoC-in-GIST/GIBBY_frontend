module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
      '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
      '^react-router-dom/(.*)$': '<rootDir>/node_modules/react-router-dom/$1'
    }
  };