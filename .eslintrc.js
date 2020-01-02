module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    'jest/globals': true
  },
  extends: [
    'airbnb-base',
  ],
  plugins: ['jest'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "space-before-function-paren": ["error", "always"],
    "no-underscore-dangle": "off",
    "no-param-reassign": ["error", { "props": false }],
    "no-shadow": "warn",
    "max-len": ["error", {
      "code": 180,
      "ignorePattern": "^\\s*/\\*.*\\*/\\s*$",
      "ignoreComments": true
    }],
    "radix": ["warn", "as-needed"],
    "arrow-parens": "off",
    "arrow-body-style": "off",
    "object-curly-newline": "warn",
    "prefer-destructuring": ["error", {"object": true, "array": false}],
    "func-names": "off",
    "no-restricted-imports": ["error", {
      "paths": [{
        "name": "uiv",
        "message": "Please use the globally registered component/directive instead"
      }]
    }],
    "import/prefer-default-export": "off",
  },
};
