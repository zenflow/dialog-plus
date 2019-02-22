import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import pkg from './package.json'
import babel from 'rollup-plugin-babel'

export default [
  {
    input: 'src/dialogplus.js',
    external: [],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'es' },
      { file: pkg.browser, format: 'umd', name: 'dialogplus' },
    ],
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      commonjs(),
    ],
  },
]
