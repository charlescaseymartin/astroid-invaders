import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from './tsconfig.paths.json';

const config: JestConfigWithTsJest = {
    testEnvironment: 'node',
    testMatch: ['**/**/*.spec.ts'],
    verbose: true,
    forceExit: false,
    transform: {
        '^.+.tsx?$': ['ts-jest', {}],
    },
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
};

export default config;
