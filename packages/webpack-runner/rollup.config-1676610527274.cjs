'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var typescript = require('rollup-plugin-typescript2');
var commonjs = require('@rollup/plugin-commonjs');
var dts = require('rollup-plugin-dts');

const plugin = [
  typescript(),
  commonjs()
];
const config = [
  {
    input: "src/index.ts",
    plugins: plugin,
    output: [
      {
        file: "dist/index.js",
        format: 'cjs'
      }
    ]
  },
  {
    input: "src/index.ts",
    plugins: [dts.default()],
    output: [{ file: "dist/types.d.ts", format: "cjs" }]
  }
];

exports.default = config;
