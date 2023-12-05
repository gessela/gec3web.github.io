var cartelas = [];
var numerosSorteados = [];
var bolas = []

function gerarCartela() {
  const nomeJogador = prompt("Digite seu nome:");
  const cartela = {
    nome: nomeJogador,
    cartela: [] 
  };
  gerarNumeros(1, 15, cartela.cartela)
  gerarNumeros(16, 30, cartela.cartela)
  gerarNumeros(31, 45, cartela.cartela, true)
  gerarNumeros(46, 60, cartela.cartela)
  gerarNumeros(61, 75, cartela.cartela)

  cartelas.push(cartela);
  exibirCartela(cartela);
}

function gerarNumeros(inicio, fim, cartela, centro = false) {
  

  for(i = 0; i < 5; i++){
    if(centro && i == 2){
      cartela.push('X')
      continue
    }

    let numero
    do {
      numero = Math.floor(Math.random() * (fim - inicio + 1)) + inicio;
    } while(cartela.includes(numero));
    cartela.push(numero);
    
  }
}

function exibirCartela(cartela) {
  const cartelasDiv = document.getElementById('cartelas');
  const cartelaDiv = document.createElement('div');
  cartelaDiv.classList.add('cartela');
  cartelaDiv.innerHTML = `<h3>${cartela.nome}</h3>`;

  for (i = 0; i < 21; i += 5) {
    let html = '<p>'
    switch(i) {
      case 0:
        html += 'B: '
        break
      case 5:
        html += 'I: '
        break
      case 10:
        html += 'N: '
        break
      case 15:
        html += 'G: '
        break
      case 20:
        html += 'O: '
        break
    }
    
    for(j = 0; j < 5; j++){
      html += cartela.cartela[i+j] + ', ';
    }
    
    html += '</p>'
    cartelaDiv.innerHTML += html;
  }
  cartelasDiv.appendChild(cartelaDiv);
}
var intervalo

function iniciarJogo() {
  if (cartelas.length < 2) {
    alert('É necessário ter pelo menos 2 cartelas para iniciar o jogo.');
    return;
  }

  for(i = 1; i < 76; i++) {
    bolas.push(i);
  }

  if (intervalo) return

 intervalo = setInterval(() => {
    if(bolas.length == 0){
      clearInterval(intervalo);
      alert("acabaram as bolas")
    }

    const numeroSorteado = bolas.splice(Math.floor(Math.random() * bolas.length), 1)[0];
    numerosSorteados.push(numeroSorteado);
    const listaNumeros = document.getElementById('listaNumeros');
    const novoItem = document.createElement('li');
    novoItem.textContent = numeroSorteado;
    listaNumeros.appendChild(novoItem);

    const vencedor = verificarVencedores();
    if (vencedor) {
      clearInterval(intervalo);
      alert(`O vencedor é ${vencedor}! Parabéns!`);
    }
  }, 500); // Sorteia um número a cada 3 segundos
}

function verificarVencedores() {
  for (const cartela of cartelas) {


    let numerosMarcados = cartela.cartela.filter(num => numerosSorteados.includes(num));

    if(numerosMarcados.length == cartela.cartela.length-1) {
      return cartela.nome
    }

  }
  
  return null;
}
