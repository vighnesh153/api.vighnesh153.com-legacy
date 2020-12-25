module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:security/recommended',
    'plugin:jest/recommended',
  ],
  plugins: ['security'],
  parserOptions: {
    ecmaVersion: 12,
  },
  ignorePatterns: ['node_modules'],
  rules: {
    'no-return-await': 'off',
    'no-param-reassign': 'off',
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'no-underscore-dangle': 'off',
    'consistent-return': 'off',

    'max-len': 'warn',
    'no-unused-vars': 'warn',
  },
};
