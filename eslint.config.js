import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs,jsx}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  pluginReact.configs.flat.recommended,
  globalIgnores(["**/*.test.jsx", "coverage/*", "**/*.test.js", "dist", "dev-dist", "**/setupTests.js"]),
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  }
]);
