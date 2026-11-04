# Fjord & Fogo - Painel do restaurante

Projeto acadêmico individual da disciplina Laboratório de Programação Front End,
desenvolvido com React, TypeScript e Vite.

**Autor:** Jhonatan Gomes  
**Repositório:** https://github.com/jonnywebnet/painel-delivery

## Sobre o projeto

Painel de gerenciamento de cardápio para um restaurante parceiro de delivery.
O sistema permite autenticar o responsável pelo restaurante, visualizar pratos,
buscar por nome ou cozinha, cadastrar, editar e excluir itens do cardápio.

As operações usam a API pública DummyJSON. Como a API simula as alterações, o
frontend atualiza o estado local depois de cada operação bem-sucedida.

## Funcionalidades

- Login com `POST /auth/login`;
- Persistência e restauração da sessão com token;
- Rota protegida e logout;
- Listagem de pratos com foto, cozinha, tempo e preço calculado;
- Busca por nome;
- Filtro por cozinha;
- Cadastro, edição e exclusão com confirmação;
- Estados de carregamento, erro e lista vazia;
- Interface responsiva para telas estreitas.

## Stack

- React 19;
- TypeScript;
- Vite;
- React Router DOM;
- Axios;
- DummyJSON Recipes API.

## Como executar

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

A URL da API fica configurada no arquivo `.env`:

```env
VITE_API_URL=https://dummyjson.com
```

## Credenciais de demonstração

- Usuário: `emilys`
- Senha: `emilyspass`

## Regra de preço

A API não fornece preço. O painel calcula o valor usando a regra do trabalho:

```text
preço = 15 + 0,50 × (tempo de preparo + tempo de cozimento)
```

O preço é exibido em reais.

## Build de produção

```bash
npm run build
```

