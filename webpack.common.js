const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: { app: "./src/index.js" },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: {
        extensions: [".js", ".jsx", ".json"],
        alias: {
            "@pages": path.join(__dirname, "./src/pages"),
            "@components": path.join(__dirname, "./src/components"),
            "@images": path.join(__dirname, "./src/images"),
            "@style": path.join(__dirname, "./src/style"),
        }
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                use: ["babel-loader"],
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader",'less-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: ["url-loader"],
                // options: {
                //     limit: 10000,
                //     name: 'img/[name].[hash:4].[ext]'
                // }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: ["url-loader"],
                // options: {
                //     limit: 10000,
                //     name: 'img/[name].[hash:4].[ext]'
                // }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin(["dist"])
    ]
};
