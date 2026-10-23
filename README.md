# Cadastro de pessoas

CRUD simples em JavaScript para CPF, nome e data de nascimento, com idade calculada automaticamente. O projeto fica dividido em `front/` (interface) e `back/` (regras e testes). Os dados são persistidos no `localStorage` do navegador.

## Executar

Sirva a pasta do projeto com um servidor HTTP local (os módulos do navegador não funcionam ao abrir o arquivo diretamente). Com Node.js 18 ou superior, execute `node --test` na pasta do projeto para rodar os testes do back.

## Regras

- CPF deve ter 11 dígitos e não pode se repetir.
- Nome e data de nascimento são obrigatórios; datas futuras são recusadas.
- A idade considera se o aniversário já ocorreu no ano atual.
