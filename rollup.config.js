/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import minify from 'rollup-plugin-babel-minify';

export default (pkgName) => ({
  input: './src/index.js',
  output: {
    file: `./build/${pkgName}.js`,
    format: 'umd',
    name: pkgName,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    minify({
      comments: false,
    }),
  ],
});
