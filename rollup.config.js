/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const titleCase = (str) => str.replace(/\b\S/g, t => t.toUpperCase()).replace('-', '');

export default (pkgName) => ([
  {
    input: './src/index.js',
    output: {
      file: `./dist/${pkgName}.umd.js`,
      format: 'umd',
      name: titleCase(pkgName),
      exports: 'named',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
      terser(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: `./dist/${pkgName}.cjs.js`,
      format: 'cjs',
      exports: 'named',
    },
  },
  {
    input: 'src/index.js',
    output: {
      file: `./dist/${pkgName}.esm.js`,
      format: 'es',
    },
  },
]);
