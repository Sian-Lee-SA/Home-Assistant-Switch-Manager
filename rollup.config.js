import nodeResolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";

const dev = process.env.ROLLUP_WATCH;

const extensions = [".js", ".ts"];

module.exports = [
  {
    input: "js/main.ts",
    output: {
      file: "custom_components/switch_manager/assets/switch_manager_panel.js",
      format: "es",
    },
    preserveEntrySignatures: false,
    inlineDynamicImports: true,
    plugins: [
      nodeResolve({
        extensions,
        preferBuiltins: false,
        browser: true,       
      }),
      json(),
      typescript(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: 'bundled'
      }),
      !dev && terser({ format: { comments: false } }),
    ],
  },
];