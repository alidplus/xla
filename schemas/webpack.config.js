const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/login.js',
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: 'login.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
