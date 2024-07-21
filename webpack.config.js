const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    // Usa index.html como arquivo de inicio e faz bundle com suas dependências
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
    }),

    // Minifica o arquivo styles.css
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),

    // Permite que partes específicas do código sejam atualizadas dinamicamente no navegador sem a necessidade de recarregar a página inteira
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    // Configuração para realizar build automática
    static: "./dist",
    hot: true,
  },
  mode: "development",
  module: {
    rules: [
      {
        // Configuração para aceitar CSS, SASS e SCSS
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "sass-loader",
        ],
      },
      {
        // Configuração para aceitar CSS simples
        test: /\.css$/i,
        use: [
          "style-loader",
          "css-loader",
        ],
      },
      {
        // Configuração para aceitar JS e usar Babel para transpilar
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        // Configuração para aceitar arquivos de imagem
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              context: path.resolve(__dirname, "src/assets"),
              outputPath: "assets",
              publicPath: "assets",
              esModule: false,
            },
          },
        ],
      },
    ],
  },
};
