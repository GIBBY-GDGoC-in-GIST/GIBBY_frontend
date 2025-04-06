module.exports = {
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    moduleNameMapper: {
      '^react-router-dom$': '<rootDir>/node_modules/react-router-dom',
      '^react-router-dom/(.*)$': '<rootDir>/node_modules/react-router-dom/$1'
    },
    transform: {
      '^.+\\.(js|jsx)$': 'babel-jest'
    },
    moduleDirectories: ['node_modules', 'src'],
    transformIgnorePatterns: [
      '/node_modules/(?!react-router-dom).+\\.js$'
    ]
  };