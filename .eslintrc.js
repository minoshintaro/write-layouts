module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 2015,
    sourceType: "module",
  },
  globals: {
    figma: 'readonly'
  },
  rules: {
    "no-console": "warn",
    "no-unused-vars": "off",
    "indent": ["error", 2],
  },
};
