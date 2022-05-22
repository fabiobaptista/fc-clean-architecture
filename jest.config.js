module.exports = {
  roots: ['<rootDir>/src/'],
  modulePaths: ['<rootDir>/src/'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: { '@/(.*)': '<rootDir>/src/$1' },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts}'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  }
}
