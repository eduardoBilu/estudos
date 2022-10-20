// modulos externos
const inquirer = require('inquirer')
const chalk = require('chalk')

// modulos internos
const fs = require('fs')
const { exit } = require('process')
const { json } = require('express')

console.log('iniciando o Accunts')

operation()

function operation() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                menssage: 'O que você deseja fazer?',
                choices: [
                    'Criar Conta', 
                    'Consultar Saldo', 
                    'Depositar', 
                    'Sacar', 
                    'Sair'
                ],
            },
        ])
        .then((answer) => {
            const action = answer['action']

            if(action === 'Criar Conta') {
                createAccount()
            } else if(action === 'Depositar') {
                deposit()
            } else if(action === 'Consultar Saldo') {
                getAccountBalance()
            } else if(action === 'Sacar') {
                withdraw()
            } else if(action === 'Sair') {
                console.log(chalk.bgBlue.black('obrigado por usar o Accounts'))
                process.exit()                
            }
        })
        .catch((err) => console.log(err))
}

// create an account
function createAccount() {
    console.log(chalk.bgGreen.black('PArabens por escolher o nosso banco!'))
    console.log(chalk.green('Defina as opções da sua conta a seguir'))

    buildAccount()
}

function buildAccount() {

    inquirer.prompt([
        {
            name:'accountName',
            message: 'Digite um nome para a sua conta'
        }
    ]).then(answer => {
        const accountName = answer['accountName']

        console.info(accountName)

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts')
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.log(chalk.bgRed.black('Esta conta ja existe, escolha outro nome'))
            buildAccount()
            return
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}',
        function(err) {
            console.log(err)
        })

        console.log(chalk.green('Parabéns, a sua conta foi criada!'))
        operation()
    })
    .catch(err => console.log(err))
}

// add an amount to user account
function deposit() {
    inquirer
        .prompt([
            {
                name: 'accountName',
                message: 'Qual o nome da sua conta?'
            },
        ])
        .then((answer) => {
            const accountName = answer['accountName']
            
            // verify if account exists
            if(!checkAccount(accountName)) {
                return deposit()
            }

            inquirer
                .prompt([
                    {
                        name: 'amount',
                        message: 'Quanto você deseja depositar',
                    },
                ])
                .then((answer) => {
                    const amount = answer['amount']

                    // add an amount
                    addAmount(accountName, amount)
                    operation()
                })        
    }).catch(err => console.log(err))
}

function checkAccount(accountName) {

    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(chalk.bgRed.black('Esta consta não existe, escolha outro nome!'))
        return false
    }
    return true
}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r',
    })

    return JSON.parse(accountJSON)
}

function addAmount(accountName, amount) {
    const accountDate = getAccount(accountName)

    if (!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde!'))
        return deposit()
    }
    
    accountDate.balance = parseFloat(amount) + parseFloat(accountDate.balance)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountDate),
        function (err) {
            console.log(err)
        }
    )

    console.log(chalk.green(`Foi depositado o valor de R$${amount} na sua conta!`))
}

// show account balance
function getAccountBalance() {
    inquirer
    .prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da seua conta',
        },
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        // verify if account exists
        if (!checkAccount(accountName)) {
            return getAccountBalance()
        }

        const accountDate = getAccount(accountName)

        console.log(chalk.bgBlue.black(`Olá, o saldo da sua conta é de R$${accountDate.balance}`)),
        operation()
    })
    .catch(err => console.log(err))
}

// withdraw an amount form user accont
function withdraw() {

    inquirer
    .prompt([
        {
            name: 'accountName',
            message: 'Qual o nome da sua conta?',
        }
    ])
    .then((answer) => {
        const accountName = answer['accountName']

        if(!checkAccount(accountName)) {
            return withdraw()
        }

        inquirer
        .prompt([
            {
                name: 'amount',
                message: 'Quanto você deseja sacar?',
            }
        ])
        .then((answer) => {
            const amount = answer['amount']

            console.log(amount)
            operation()
        })
        .catch((err) => console.log(err))
    })   
}

function removeAmount(accountName, amount) {
    const accountDate = accountDate(accountName)

    if(!amount) {
        console.log(chalk.bgRed.black('Ocorreu um erro, tente novamente mais tarde'))
        return withdraw
    }

    if(accountDate.balance < amount) {
        console.log(chalk.bgRed.black('Valor indisponível'))
        return withdraw()
    }
    
    accountDate.balance = parseFloat(accountDate.balance) - parseFloat(amount)

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountDate),
        function (err) {
            console.log(err)
        },
    )

    console.log(chalk.green(`Foi realizado um saque de r$${amount} da sua conta!`))

    operation()
}