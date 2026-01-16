import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts", "src/react/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
});
