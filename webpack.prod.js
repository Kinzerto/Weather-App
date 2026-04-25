import { merge } from 'webpack-merge';
import common from './webpack.common.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export default merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss|css)$/i,
        use: [
          MiniCssExtractPlugin.loader, // extract CSS
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css', // separate CSS file
    }),
  ],
});
