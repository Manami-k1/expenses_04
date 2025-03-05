import { defineConfig } from "babel";

export default defineConfig({
  presets: [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript", // TypeScript 使用している場合
  ],
  plugins: [
    "babel-plugin-styled-components", // styled-components のプラグイン追加
  ],
});
