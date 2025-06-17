const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.json');

module.export = {
    testEnvironment: 'jest-environment-jsdom',
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/'
    }),
    globals: {
        fetch: global.fetch
    },
};