import { calcularIdade, criarPessoa, atualizarPessoa, removerPessoa } from '../../back/src/pessoas.js';

const CHAVE = 'cadastro-pessoas';
const form = document.querySelector('#form-pessoa');
const lista = document.querySelector('#lista');
const mensagem = document.querySelector('#mensagem');
const vazio = document.querySelector('#vazio');
const contador = document.querySelector('#contador');
const cancelar = document.querySelector('#cancelar');
const botaoSalvar = document.querySelector('#salvar');
let pessoas = JSON.parse(localStorage.getItem(CHAVE) || '[]');
let cpfEmEdicao = null;

function salvar() { localStorage.setItem(CHAVE, JSON.stringify(pessoas)); }
function mostrar() {
  lista.replaceChildren();
  pessoas.forEach((pessoa) => {
    const linha = document.createElement('tr');
    const valores = [pessoa.cpf, pessoa.nome, new Date(`${pessoa.nascimento}T00:00:00`).toLocaleDateString('pt-BR'), `${calcularIdade(pessoa.nascimento)} anos`];
    valores.forEach((valor) => { const celula = document.createElement('td'); celula.textContent = valor; linha.append(celula); });
    const acoes = document.createElement('td');
    const editar = document.createElement('button'); editar.className = 'row-action'; editar.textContent = 'Editar'; editar.addEventListener('click', () => iniciarEdicao(pessoa));
    const excluir = document.createElement('button'); excluir.className = 'row-action delete'; excluir.textContent = 'Excluir'; excluir.addEventListener('click', () => { pessoas = removerPessoa(pessoas, pessoa.cpf); salvar(); mostrar(); mensagem.textContent = 'Cadastro removido.'; });
    acoes.append(editar, excluir); linha.append(acoes); lista.append(linha);
  });
  vazio.classList.toggle('hidden', pessoas.length > 0);
  contador.textContent = `${pessoas.length} ${pessoas.length === 1 ? 'pessoa cadastrada' : 'pessoas cadastradas'}`;
}
function iniciarEdicao(pessoa) {
  cpfEmEdicao = pessoa.cpf;
  Object.entries(pessoa).forEach(([campo, valor]) => { form.elements[campo].value = valor; });
  form.elements.cpf.disabled = true;
  botaoSalvar.textContent = 'Salvar alterações'; cancelar.classList.remove('hidden'); mensagem.textContent = '';
  form.elements.nome.focus();
}
function limparEdicao() {
  cpfEmEdicao = null; form.reset(); form.elements.cpf.disabled = false;
  botaoSalvar.textContent = 'Adicionar pessoa'; cancelar.classList.add('hidden');
}
form.addEventListener('submit', (evento) => {
  evento.preventDefault();
  const dados = Object.fromEntries(new FormData(form));
  try {
    pessoas = cpfEmEdicao ? atualizarPessoa(pessoas, cpfEmEdicao, dados) : criarPessoa(pessoas, dados);
    salvar(); mostrar(); limparEdicao(); mensagem.textContent = 'Cadastro salvo com sucesso.';
  } catch (erro) { mensagem.textContent = erro.message; }
});
cancelar.addEventListener('click', limparEdicao);
mostrar();
