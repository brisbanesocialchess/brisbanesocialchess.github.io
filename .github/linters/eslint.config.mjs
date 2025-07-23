import js from "@eslint/js";
import globals from "globals";
import prettierConfig from "eslint-config-prettier";
import sortKeysFix from "eslint-plugin-sort-keys-fix";

export default [
  js.configs.recommended,

  {
    ignores: ["**/.wrangler/**"],
  },

  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "sort-keys-fix": sortKeysFix,
    },
    rules: {
      "sort-keys-fix/sort-keys-fix": "error",
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
