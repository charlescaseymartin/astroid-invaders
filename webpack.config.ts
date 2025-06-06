import { resolve, parse } from 'path';
import { readdirSync } from 'fs';
import nodeExternals from 'webpack-node-externals';
import CopyFiles from 'copy-webpack-plugin';


const getMigrationEntries = () => {
    const dir = resolve(__dirname, 'src', 'database', 'migrations');
    return readdirSync(dir).reduce((acc, file) => {
        const key = `db/migrations/${file.replace(parse(file).ext, '')}`;
        return {
            ...acc,
            [key]: resolve(dir, file),
        }
    }, {});
}

module.exports = {
    entry: {
        index: './src/index.ts',
        ['db/index']: './src/database/index.ts',
        ...getMigrationEntries(),
    },
    target: 'node',
    mode: 'production',
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [
                    '/node_modules',
                    '/jest.config.ts',
                    '/src/test',
                    '/client',
                ],
            }
        ]
    },
    plugins: [
        new CopyFiles({
            patterns: [{
                from: './client/build',
                to: './build',
            }]
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: resolve(__dirname, 'dist'),
    },
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: 'all',
        },
    },
};
