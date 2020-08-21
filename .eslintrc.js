/*
 * @Author: 汪锦
 * @Date: 2020-06-18 09:59:18
 * @LastEditors: 汪锦
 * @LastEditTime: 2020-06-18 10:30:43
 * @Description: eslint配置
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-unused-vars': 'off'
  }
}
