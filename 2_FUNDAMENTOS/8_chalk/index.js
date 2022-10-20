const chalk = require("chalk");
const minimist = require('minimist')

const args = minimist(process.argv.slice(1))

let nota = parseInt(args['a'])

if (nota >= 7) {
    console.log(chalk.green('Parabens! Você esta aprovado!'))
} else {
    console.log(
        chalk.bgRed.black('Você precisa fazer a prova de recuperação!'))
}