import test from 'node:test';
import assert from 'node:assert/strict';
import { calcularIdade, validarPessoa, criarPessoa, atualizarPessoa, removerPessoa } from '../src/pessoas.js';

test('calcula a idade considerando se o aniversário já ocorreu', () => {
  assert.equal(calcularIdade('2000-10-16', new Date('2026-10-16T12:00:00')), 26);
  assert.equal(calcularIdade('2000-10-17', new Date('2026-10-16T12:00:00')), 25);
});

test('valida CPF, nome e data de nascimento obrigatórios', () => {
  assert.equal(validarPessoa({ cpf: '12345678901', nome: 'Ana', nascimento: '2000-01-01' }), null);
  assert.match(validarPessoa({ cpf: '123', nome: '', nascimento: '' }), /CPF/);
});

test('cria, atualiza e remove pessoas pelo CPF', () => {
  const vazio = [];
  const pessoa = { cpf: '12345678901', nome: 'Ana', nascimento: '2000-01-01' };
  const criado = criarPessoa(vazio, pessoa);
  assert.equal(criado.length, 1);
  assert.equal(criarPessoa(criado, { ...pessoa, nome: 'Bia' }).length, 1);
  assert.equal(atualizarPessoa(criado, pessoa.cpf, { ...pessoa, nome: 'Bia' })[0].nome, 'Bia');
  assert.deepEqual(removerPessoa(criado, pessoa.cpf), []);
});
