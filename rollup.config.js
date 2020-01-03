/* eslint-disable import/no-extraneous-dependencies */
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { terser } from 'rollup-plugin-terser';


export default (pkgName) => ([
  {
    input: './src/index.js',
    output: {
      file: `./dist/${pkgName}.umd.js`,
      format: 'umd',
      name: pkgName,
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
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
    ],
  },
  {
    input: 'src/index.js',
    output: {
      file: `./dist/${pkgName}.esm.js`,
      format: 'es',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      resolve(),
      commonjs(),
    ],
  },
]);
