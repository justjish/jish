/** @type {import("eslint/conf/eslint-all")} */
export default {
  parser: "@typescript-eslint/parser",
  root: true,
  extends: ["@remix-run/eslint-config", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "prettier/prettier": [
      "warn",
      {
        singleQuote: true,
      },
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "react/no-unknown-property": ["error"],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  ignorePatterns: [
    "dist",
    "node_modules",
    "*.js",
    "*.jsx",
    "build",
    "public",
    "./app/styles/tailwind.css",
    "/.cache",
    "/.github",
    "/.husky",
    "/build",
    "/public",
    "/node_modules",
    "/dist",
    "./app/styles/tailwind.css",
  ],
};
