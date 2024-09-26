import path from 'path';
import nodeExternals from 'webpack-node-externals';
import CopyFiles from 'copy-webpack-plugin';

module.exports = {
    entry: './src/index.ts',
    target: 'node',
    mode: 'production',
    externals: [nodeExternals()],
    resolve: {
        extensions: ['.ts', '.tsx'],
        alias: {
            '@client': path.resolve(__dirname, 'client'),
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
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
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js'
    },
};
