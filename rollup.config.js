import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import babel from "@rollup/plugin-babel";
const commonjs = require("@rollup/plugin-commonjs");
const babelTypescript = require("@babel/preset-typescript");
const babelDecorators = require("@babel/plugin-proposal-decorators");
const babelClassProperties = require("@babel/plugin-proposal-class-properties");
const ignore = require("./rollup-plugins/ignore-plugin");
const path = require("path");
const replace = require("@rollup/plugin-replace");
const { string } = require("rollup-plugin-string");
const extensions = [".js", ".ts"];

module.exports = [
  {
    input: "js/main.ts",
    output: {
      file: "custom_components/switch_manager/assets/switch_manager_panel.js",
      format: "es",
      externalLiveBindings: false,
      sourcemap: 'inline'
    },
    preserveEntrySignatures: false,
    inlineDynamicImports: true,
    plugins: [
      nodeResolve({
        extensions,
        preferBuiltins: false,
        browser: true,
        rootDir: path.resolve(__dirname)
      }),
      commonjs(),
      json(),
      babel({
        babelrc: false,
        compact: true,
        presets: [babelTypescript.default],
        babelHelpers: "bundled",
        plugins: [
          "@babel/syntax-dynamic-import",
          "@babel/plugin-proposal-optional-chaining",
          "@babel/plugin-proposal-nullish-coalescing-operator",
          [babelDecorators.default, { decoratorsBeforeExport: true }],
          [babelClassProperties.default, { loose: true }],
        ].filter(Boolean),
        extensions,
        exclude: [require.resolve("@mdi/js/mdi.js")],
      }),
      string({
        // Import certain extensions as strings
        include: [path.join(path.resolve(__dirname), "node_modules/**/*.css")],
      }),
      replace({
        __DEV__: false,
        __BUILD__: JSON.stringify("latest"),
        __VERSION__: JSON.stringify('0.0.1'),
        __DEMO__: false,
        __SUPERVISOR__: false,
        __BACKWARDS_COMPAT__: false,
        __STATIC_PATH__: "/static/",
        preventAssignment: false
      }),
      ignore({
        files: [
          require.resolve("@polymer/font-roboto/roboto.js")
        ],
      })
    ],
  },
];