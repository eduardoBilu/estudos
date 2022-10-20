const path = require("path")

// path absoluto
console.log(path.resolve('teste.txt'))

// formar path
const midFolder = 'relatórios'
const fileName = 'eduardo.txt'

const finalPath = path.join('/', 'arquivo', midFolder, fileName)

console.log(finalPath)