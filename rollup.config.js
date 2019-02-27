import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import postcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import { terser } from 'rollup-plugin-terser'
import filesize from 'rollup-plugin-filesize'
import pkg from './package.json'

const getConfig = ({ minimize, formats, sourcemap }) => {
  return {
    input: 'src/dialogplus.js',
    external: [],
    output: formats.map(format => {
      const fileExt = format + (minimize ? '.min' : '') + '.js'
      const file = `dist/dialogplus.${fileExt}`
      return {
        format,
        file,
        sourcemap: sourcemap ? 'inline' : false,
        name: 'dialogplus',
        globals: {},
        banner: `\
/** @preserve
  * package: ${pkg.name} v${pkg.version}
  * file: ${file}
  * homepage: ${pkg.homepage}
  * license: ${pkg.license}
  **/\n`,
      }
    }),
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**',
      }),
      commonjs(),
      postcss({
        inject: false,
        plugins: [autoprefixer()],
        minimize: minimize,
        sourceMap: sourcemap ? 'inline' : false,
      }),
      minimize &&
        terser({
          output: {
            comments: (_, { value }) => /@preserve/.test(value),
          },
        }),
      filesize({
        showMinifiedSize: false,
        showGzippedSize: false,
        render: (_, { file }, { bundleSize }) => `${file}: ${bundleSize}`,
      }),
    ].filter(Boolean),
  }
}

export default (process.env.NODE_ENV === 'production'
  ? [
      getConfig({ minimize: false, formats: ['umd', 'cjs'], sourcemap: false }),
      getConfig({ minimize: true, formats: ['umd'], sourcemap: false }),
    ]
  : getConfig({ minimize: false, formats: ['umd'], sourcemap: true }))
