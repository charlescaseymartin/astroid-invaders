import { resolve, parse } from 'path';
import { readdirSync } from 'fs';
import webpack from 'webpack';
import nodeExternals from 'webpack-node-externals';
import CopyFiles from 'copy-webpack-plugin';


const getDatabaseRelatedEntries = (sourceFolder: string) => {
    const dir = resolve(__dirname, 'src', 'database', sourceFolder);
    return readdirSync(dir).reduce((acc, file) => {
        const key = `db/${sourceFolder}/${file.replace(parse(file).ext, '')}`;
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
        ...getDatabaseRelatedEntries('migrations'),
        ...getDatabaseRelatedEntries('entities'),
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
        path: resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    optimization: {
        minimize: false,
    },
};
