'use strict'

const miaConfig = require('@mia-platform/eslint-config-mia')

module.exports = [
  { ignores: ['node_modules/', 'coverage/', '.tap/'] },
  ...miaConfig,
]
