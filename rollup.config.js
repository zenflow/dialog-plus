import rollupPluginNodeResolve from 'rollup-plugin-node-resolve'
import rollupPluginCommonjs from 'rollup-plugin-commonjs'
import rollupPluginBabel from 'rollup-plugin-babel'
import rollupPluginPostcss from 'rollup-plugin-postcss'
import autoprefixer from 'autoprefixer'
import { terser as rollupPluginTerser } from 'rollup-plugin-terser'
import rollupPluginFilesize from 'rollup-plugin-filesize'
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
      rollupPluginNodeResolve(),
      rollupPluginBabel({
        exclude: 'node_modules/**',
      }),
      rollupPluginCommonjs(),
      rollupPluginPostcss({
        inject: false,
        plugins: [autoprefixer()],
        minimize: minimize,
        sourceMap: sourcemap ? 'inline' : false,
      }),
      minimize &&
        rollupPluginTerser({
          output: {
            comments: (_, { value }) => /@preserve/.test(value),
          },
        }),
      rollupPluginFilesize({
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
  : getConfig({ minimize: false, formats: ['cjs'], sourcemap: true }))
