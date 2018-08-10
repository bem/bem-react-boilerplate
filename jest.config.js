module.exports = {
  testURL : 'http://localhost',
  testPathIgnorePatterns : ['node_modules'],
  moduleFileExtensions : ['ts', 'tsx', 'js'],
  transform : {
      '^.+\\.(ts|tsx)$' : 'ts-jest'
  },
  testMatch : [
      '**/src/**/*.test.+(ts|tsx)'
  ],
  moduleNameMapper: {
    '\\.(css|less|svg)$': '<rootDir>/__mocks__/style.ts'
  }
};
