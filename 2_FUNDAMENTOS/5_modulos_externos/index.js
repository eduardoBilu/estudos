const minimist = require("minimist")

const args = minimist(process.argv.slice(2));

console.log(args);

const nome = args["nome"];
const profissao = args["profissao"];
const idade = args["idade"];

console.log(nome, profissao);
console.log(idade);

console.log(`O nome dele é ${nome} e a profissao dele é ${profissao}, e ele tem ${idade} anos`)