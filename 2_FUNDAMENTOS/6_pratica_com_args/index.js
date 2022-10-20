// externo
const minimist = require('minimist')

// interno
const soma = require('./soma.js').soma

const args = minimist(process.argv.slice(2))

const a = parseInt(args['a'])
const b = parseInt(args['b'])

soma(a, b)