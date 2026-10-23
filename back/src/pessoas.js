export function calcularIdade(dataNascimento, hoje = new Date()) {
  const [ano, mes, dia] = dataNascimento.split('-').map(Number);
  let idade = hoje.getFullYear() - ano;
  if (hoje.getMonth() + 1 < mes || (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)) idade--;
  return idade;
}

export function validarPessoa(pessoa) {
  if (!/^\d{11}$/.test(pessoa.cpf ?? '')) return 'CPF deve conter 11 números.';
  if (!pessoa.nome?.trim()) return 'Informe o nome.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pessoa.nascimento ?? '') || Number.isNaN(Date.parse(`${pessoa.nascimento}T00:00:00`))) return 'Informe uma data de nascimento válida.';
  if (new Date(`${pessoa.nascimento}T00:00:00`) > new Date()) return 'A data de nascimento não pode estar no futuro.';
  return null;
}

export function criarPessoa(pessoas, pessoa) {
  if (validarPessoa(pessoa)) throw new Error(validarPessoa(pessoa));
  if (pessoas.some((item) => item.cpf === pessoa.cpf)) throw new Error('Já existe uma pessoa com este CPF.');
  return [...pessoas, { ...pessoa, nome: pessoa.nome.trim() }];
}

export function atualizarPessoa(pessoas, cpf, dados) {
  if (validarPessoa(dados)) throw new Error(validarPessoa(dados));
  if (dados.cpf !== cpf && pessoas.some((item) => item.cpf === dados.cpf)) throw new Error('Já existe uma pessoa com este CPF.');
  return pessoas.map((pessoa) => pessoa.cpf === cpf ? { ...dados, nome: dados.nome.trim() } : pessoa);
}

export function removerPessoa(pessoas, cpf) {
  return pessoas.filter((pessoa) => pessoa.cpf !== cpf);
}
