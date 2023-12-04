let cartelas = [];
let numerosSorteados = [];

function gerarCartela() {
  const nomeJogador = prompt("Digite seu nome:");
  const cartela = {
    nome: nomeJogador,
    cartela: {
      'B': gerarNumeros(1, 15),
      'I': gerarNumeros(16, 30),
      'N': gerarNumeros(31, 45, true),
      'G': gerarNumeros(46, 60),
      'O': gerarNumeros(61, 75)
    }
  };
  cartelas.push(cartela);
  exibirCartela(cartela);
}

function gerarNumeros(inicio, fim, centro = false) {
  const numeros = [];
  while (numeros.length < 5) {
    const numero = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
    if (!numeros.includes(numero)) {
      numeros.push(numero);
    }
  }
  return numeros;
}

function exibirCartela(cartela) {
  const cartelasDiv = document.getElementById('cartelas');
  const cartelaDiv = document.createElement('div');
  cartelaDiv.classList.add('cartela');
  cartelaDiv.innerHTML = `<h3>${cartela.nome}</h3>`;
  for (let coluna in cartela.cartela) {
    cartelaDiv.innerHTML += `<p>${coluna}: ${cartela.cartela[coluna].join(', ')}</p>`;
  }
  cartelasDiv.appendChild(cartelaDiv);
}
var intervalo

function iniciarJogo() {
  if (cartelas.length < 2) {
    alert('É necessário ter pelo menos 2 cartelas para iniciar o jogo.');
    return;
  }
if (intervalo) return

 intervalo = setInterval(() => {
    const numeroSorteado = sortearNumero();
    numerosSorteados.push(numeroSorteado);
    const listaNumeros = document.getElementById('listaNumeros');
    const novoItem = document.createElement('li');
    novoItem.textContent = numeroSorteado;
    listaNumeros.appendChild(novoItem);

    const vencedor = verificarVencedores(numeroSorteado);
    if (vencedor) {
      clearInterval(intervalo);
      alert(`O vencedor é ${vencedor}! Parabéns!`);
    }
  }, 3000); // Sorteia um número a cada 3 segundos
}

function sortearNumero() {
  let numero;
  do {
    numero = Math.floor(Math.random() * 75) + 1;
  } while (numerosSorteados.includes(numero));
  return numero;
}

function verificarVencedores(numeroSorteado) {
  for (const cartela of cartelas) {
    const numerosCartela = Object.values(cartela.cartela).flat();
    if (numerosCartela.includes(numeroSorteado)) {
      const index = numerosCartela.indexOf(numeroSorteado);
      numerosCartela.splice(index, 1);
      if (numerosCartela.length === 0) {
        return cartela.nome;
      }
    }
  }
  return null;
}
