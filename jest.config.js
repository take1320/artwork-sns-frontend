module.exports = {
  // roots: ['<rootDir>/tests'],
  // testMatch: ['**/*.spec.ts'],
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest',
  },
  testPathIgnorePatterns: ['/node_modules/', '/_actions/'],
};
