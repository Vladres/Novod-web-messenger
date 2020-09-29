const path = require("path");
require("babel-polyfill");
require("style-loader");
require("css-loader");

module.exports = {
    entry: ["babel-polyfill", "./src/index.js"],
    devServer: {
        contentBase: path.join(__dirname, "public"),
        compress: true,
        port: 3000,
        watchContentBase: true,
        progress: true
    },
    mode: "development",
    output: {
        filename: "./main.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
};