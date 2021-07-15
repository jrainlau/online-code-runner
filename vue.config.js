const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  outputDir: './docs',
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin(),
    ],
  },
};
