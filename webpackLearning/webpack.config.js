const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    devServer: {
        port: 3000,
        hot: true,
    },
    devtool: "inline-source-map",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}