import { resolve, parse } from 'path';
import { readdirSync } from 'fs';
import nodeExternals from 'webpack-node-externals';
import CopyFiles from 'copy-webpack-plugin';


const getMigrationEntries = () => {
    const dir = resolve(__dirname, 'src', 'database', 'migrations');
    return readdirSync(dir).reduce((acc, file) => {
        const key = `migrations/${file.replace(parse(file).ext, '')}`;
        return {
            ...acc,
            [key]: resolve(dir, file),
        }
    }, {});
}

module.exports = {
    entry: {
        index: './src/index.ts',
        ...getMigrationEntries()
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
                    resolve(__dirname, 'node_modules'),
                    resolve(__dirname, 'client'),
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
        libraryTarget: 'umd',
    },
    optimization: {
        minimize: false,
    },
};
