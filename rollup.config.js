/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';


export default (pkgName) => ({
  input: './src/index.js',
  output: {
    file: `./dist/${pkgName}.js`,
    format: 'umd',
    name: pkgName,
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve(),
    commonjs(),
    terser(),
  ],
});
