import commonjs from "@rollup/plugin-commonjs";

const plugin = [
  commonjs()
];
const config = [
  {
    input: "src/index.js",
    plugins: plugin,
    bundleConfigAsCjs: true,
    output: [
      {
        file: "dist/index.js",
        format: 'cjs'
      }
    ]
  }
];

export default config;
