const textTarefa = document.querySelector('#texto-tarefa'); // input
const criaTarefa = document.querySelector('#criar-tarefa'); // botao do input
const listaTarefa = document.querySelector('#lista-tarefas'); // Ol
const itemLi = document.getElementsByTagName('li'); // Capturo todos os elementos de tag li
const reseta = document.querySelector('#remover-finalizados'); // Botao de remover as tarefas finalizadas
const resetaTudo = document.querySelector('#apaga-tudo'); // Botão de remover tudo
const save = document.querySelector('#salvar-tarefas'); // Botão de salvar
const resetaSelecionada = document.querySelector('#remover-selecionado'); // Botão remover selecionado
const cor = 'rgb(168, 168, 168)'; // Cor de fundo
const cima = document.querySelector('#mover-cima'); // Botao para cima
const baixo = document.querySelector('#mover-baixo'); // Botao para baixo


function criaLista() {
  if (!textTarefa.value) alert('Type a task!');
  else {
    const lista = document.createElement('li');
    lista.className = 'itens';
    lista.innerText = textTarefa.value;
    listaTarefa.appendChild(lista);
    textTarefa.value = '';
  }
}

criaTarefa.addEventListener('click', criaLista);
document.addEventListener('keypress', (e) => {
  if (e.keyCode === 13) criaLista();
});

function removeCor(e) {
  for (let index = 0; index < itemLi.length; index += 1) {
    itemLi[index].style.removeProperty('background-Color');
  }
  e.target.style.backgroundColor = 'rgb(168, 168, 168)';
}
listaTarefa.addEventListener('click', removeCor);

function linhas(e) {
  if (e.target.className === 'itens') e.target.className += ' completed';
  else if (e.target.className === 'itens completed') e.target.classList.remove('completed');
}
listaTarefa.addEventListener('dblclick', linhas);

function apagaTudo() {
  listaTarefa.innerHTML = '';
}
resetaTudo.addEventListener('click', apagaTudo);

function apaga() {
  const completed = document.querySelectorAll('.completed');
  for (let i = 0; i < completed.length; i += 1) {
    completed[i].remove();
  }
}
reseta.addEventListener('click', apaga);

function salvar() {
  const conteudo = listaTarefa.innerHTML;
  localStorage.setItem('conteudo', conteudo);
  alert("The tasks have been saved!")
}
save.addEventListener('click', salvar);

window.onload = function lista() {
  listaTarefa.innerHTML = localStorage.getItem('conteudo');
};

function moveCima() {
  const itens = document.querySelectorAll('.itens');
  for (let i = 1; i < itens.length; i += 1) {
    if (itens[i].style.backgroundColor === cor) listaTarefa.insertBefore(itens[i], itens[i - 1]);
  }
}
cima.addEventListener('click', moveCima);
document.addEventListener('keydown', (e) => {
  if( e.keyCode === 38) moveCima();
});

function moveBaixo() {
  const itens = document.querySelectorAll('.itens');
  for (let i = 0; i < itens.length - 1; i += 1) {
    if (itens[i].style.backgroundColor === cor) listaTarefa.insertBefore(itens[i + 1], itens[i]);
  }
}
baixo.addEventListener('click', moveBaixo);
document.addEventListener('keydown', (e) => {
  if( e.keyCode === 40) moveBaixo();
});

function selecionada() {
  const teste = document.querySelectorAll('.itens[style]');
  for (let index = 0; index < teste.length; index += 1) {
    teste[index].remove();
  }
}
resetaSelecionada.addEventListener('click', selecionada);
