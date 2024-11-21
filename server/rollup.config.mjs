import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default defineConfig({
  input: "src/test.ts",
  output: { dir: "dist", format: "cjs" },
  plugins: [typescript(), nodeResolve(), commonjs(), json()],
});
