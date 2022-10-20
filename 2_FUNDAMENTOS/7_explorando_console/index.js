//mais de uma valor
const x = 10
const y = 'Eduardo'
const z = [1, 2]

console.log(x, y, z)

//contagem de impressoes
console.count(`O valor de x é ${x}, contagem`)
console.count(`O valor de x é ${x}, contagem`)
console.count(`O valor de x é ${x}, contagem`)
console.count(`O valor de x é ${x}, contagem`)


// // contagem de impressões
// console.count("O valor de x é: " + x + " -> contagem:");
// console.count("O valor de x é: " + x + " -> contagem:");
// console.count("O valor de x é: " + x + " -> contagem:");
// console.count("O valor de y é: " + y + " -> contagem:");



// variável entre string
console.log('O nome dele é %s, e ele é estudante', y);

// limpando console
setTimeout(() => {
    console.clear();
  }, 2000);