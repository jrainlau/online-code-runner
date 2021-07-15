const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  outputDir: './docs',
  publicPath: '/online-code-runner',
  configureWebpack: {
    plugins: [
      new MonacoWebpackPlugin(),
    ],
  },
};
