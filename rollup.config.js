import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import pkg from './package.json'

const getBanner = file => `\
/** @preserve
  * package: ${pkg.name} v${pkg.version}
  * file: ${file}
  * homepage: ${pkg.homepage}
  * license: ${pkg.license}
  **/\n`

const getConfig = ({ minify, formats }) => {
  return {
    input: 'src/dialogplus.js',
    external: [],
    output: formats.map(format => {
      const file = `dist/dialogplus.${format + (minify ? '.min' : '') + '.js'}`
      return {
        format,
        file,
        banner: getBanner(file),
        sourcemap: true,
        name: 'dialogplus',
        globals: {},
      }
    }),
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      commonjs(),
      minify &&
        terser({
          output: {
            comments: (_, { value }) => /@preserve/.test(value),
          },
        }),
    ].filter(Boolean),
  }
}

export default (process.env.IS_DEVELOPMENT_BUILD
  ? getConfig({ minify: false, formats: ['umd'] })
  : [false, true].map(minify =>
      getConfig({ minify, formats: ['cjs', 'es', 'umd'] }),
    ))
