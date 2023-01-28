import typescript from "rollup-plugin-typescript2";
import commonjs from "@rollup/plugin-commonjs";

const plugin = [typescript(), commonjs()];
const config = [
  {
    input: "src/index.ts",
    plugins: plugin,
    output: [
      {
        file: "dist/index.js"
      }
    ]
  }
];

export default config;
