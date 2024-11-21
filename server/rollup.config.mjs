import { defineConfig } from "rollup";
import sucrase from "@rollup/plugin-sucrase";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default defineConfig({
  input: "src/test.ts",
  output: { dir: "dist", format: "cjs", sourcemap: true },
  plugins: [
    nodeResolve({ extensions: [".js", ".ts"] }),
    json(),
    commonjs(),
    sucrase({
      exclude: ["node_modules/**"],
      transforms: ["typescript"],
    }),
  ],
});
