module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true,
      "optionalDependencies": false,
      "peerDependencies": false
    }],
    "semi": ["error", "never"],
    "no-unused-expressions": ["error", {
      "allowShortCircuit": true,
      "allowTernary": true
    }],
    "no-param-reassign": 0,
    "space-before-function-paren": ["error", "always"],
    "no-plusplus": ["error", {
      "allowForLoopAfterthoughts": true
    }],
    "no-console": 0
  }
}
