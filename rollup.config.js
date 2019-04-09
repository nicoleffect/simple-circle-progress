import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import { eslint } from 'rollup-plugin-eslint'
import { version, name, repository, homepage } from './package.json'
import replace from 'rollup-plugin-replace'

const env = process.env.NODE_ENV

const formList = {
  dev: ['iife'],
  test: ['amd', 'cjs', 'es', 'iife', 'umd'],
  prod: ['amd', 'cjs', 'es', 'iife', 'umd'],
  publish: ['es']
}
const pluginsList = {
  dev: [],
  test: [],
  prod: [terser({
    compress: {
      drop_console: true
    },
    output: {
      comments: /!|Nicole Wong|License/i
    }
  })]
}

const copyright = new Date().getFullYear() > 2019 ? '2019-' + new Date().getFullYear() : 2019

const banner =
  '/*!\n' +
  ` * ${name} v${version}\n` +
  ` * (c) ${copyright} Nicole Wong\n` +
  ' * Released under the MIT License.\n' +
  ' */\n' +
  '\n' +
  '/*\n' +
  ` * github: ${repository.url}\n` +
  ` * demo: ${homepage}\n` +
  ' */'

const baseOutput = {
  banner: banner
}
function getOutputs (env) {
  const list = formList[env]
  if (env === 'publish') {
    return Object.assign({
      file: `publish/index.js`,
      format: list[0]
    }, baseOutput)
    return
  }
  let suffix = ''
  let isMap = false
  if (env === 'prod') {
    suffix = '.min'
    isMap = true
  }
  let arr = []
  for (let i of list) {
    let item = {
      file: `dist/simple-circle-progress.${i}${suffix}.js`,
      format: i,
      name: 'circleProgress',
      sourcemap: isMap
    }
    arr.push(Object.assign(item, baseOutput))
  }
  return arr
}

const basePlugins = [
  json(),
  replace({
    __VERSION__: version
  }),
  eslint({
    throwOnError: true,
    throwOnWarning: true,
    // include: ['src/**'],
    exclude: ['node_modules/**']
  }),
  resolve(),
  commonjs(),
  babel({
    exclude: 'node_modules/**',
    runtimeHelpers: true
  })
]

const output = getOutputs(env)
const plugins = [...basePlugins].concat(pluginsList[env])

const config = {
  input: 'src/index.js',
  output,
  plugins,
  watch: {
    exclude: 'node_modules/**'
  }
}
export default config
