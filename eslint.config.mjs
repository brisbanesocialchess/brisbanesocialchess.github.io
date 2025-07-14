import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,

  {
    files: ["packages/cfsite/**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: globals.browser,
    },
  },

  {
    files: ["docs/**/*.js"],
    languageOptions: {
      sourceType: "script",
      globals: globals.browser,
    },
  },

  prettierConfig,
];
