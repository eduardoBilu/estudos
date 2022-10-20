const chalk = require("chalk");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
})

readline.question('Qual a sua linguagem preferida? ', (language) => {
    if (language === 'Python') {
        console.log(chalk.bgRed.black('Isso nem é linguagem!'))
    } else {
        console.log(`A minha linguage preferida é: ${language}`)
    }
    
    readline.close()
})