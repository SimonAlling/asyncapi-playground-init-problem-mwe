import path from "path"

import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin"
import HtmlWebpackPlugin from "html-webpack-plugin"
import NodePolyfillPlugin from "node-polyfill-webpack-plugin"
import webpack from "webpack"

const config: (env: NodeJS.ProcessEnv) => webpack.Configuration = _ => ({
  entry: "./src/index.tsx",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader", // Injects styles in page.
            options: {
              injectType: "linkTag",
            },
          },
          {
            loader: "file-loader", // Emits stylesheet files.
            options: {
              name: "[name]-[contenthash].css",
            },
          },
          {
            loader: "extract-loader", // Extracts CSS from css-loader output.
          },
          {
            loader: "css-loader", // Resolves `@import` and `url()`.
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "src", "index.html"),
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new NodePolyfillPlugin(), // Otherwise we get errors with webpack 5.
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    historyApiFallback: {
      disableDotRule: true, // Otherwise path names with dots in them don't work.
    },
    port: 8080,
  },
})

export default config
