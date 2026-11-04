# Fjord & Fogo · Painel do restaurante

Frontend de demonstraÃ§Ã£o de um painel de delivery para gestÃ£o de restaurante, desenvolvido com React, TypeScript e Vite. O projeto Ã© um protÃ³tipo acadÃªmico: nÃ£o possui backend prÃ³prio e utiliza o DummyJSON como API pÃºblica simulada.

## O que foi implementado

- Login com `POST /auth/login`, token persistido no `localStorage` e restauraÃ§Ã£o de sessÃ£o com `GET /auth/me`;
- Rota protegida com React Router e logout;
- Dashboard inicial com indicadores, pedidos recentes e avaliaÃ§Ã£o do restaurante;
- GestÃ£o de cardÃ¡pio com busca, filtro por cozinha e contagem de resultados;
- Listagem de pratos com imagem, categoria, preÃ§o calculado e tempo de preparo;
- CriaÃ§Ã£o, ediÃ§Ã£o e exclusÃ£o com confirmaÃ§Ã£o;
- AtualizaÃ§Ã£o imediata do estado local apÃ³s as operaÃ§Ãµes simuladas da API;
- Tratamento visual de carregamento, lista vazia, validaÃ§Ã£o e erros HTTP;
- Interface mobile-first, sem rolagem lateral em telas estreitas;
- Componentes reutilizÃ¡veis em `src/components/` e serviÃ§os HTTP isolados em `src/services/`.

## Stack

- React 19 + TypeScript;
- Vite;
- React Router DOM;
- Axios;
- DummyJSON Recipes API.

## Como executar

Instale as dependÃªncias e inicie o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

A URL da API fica configurada no arquivo `.env`:

```env
VITE_API_URL=https://dummyjson.com
```

## Acesso de demonstração

O login utiliza as credenciais de demonstração da API pública definidas no enunciado do projeto. A autenticação, o armazenamento do token e a restauração da sessão continuam sendo feitos pelo frontend, sem backend próprio.

## Regra de preÃ§o

A API nÃ£o fornece preÃ§o. O painel calcula o valor de cada prato com a regra do trabalho:

```text
preÃ§o = 15 + 0,50 Ã— (tempo de preparo + tempo de cozimento)
```

As operaÃ§Ãµes de criaÃ§Ã£o, ediÃ§Ã£o e exclusÃ£o do DummyJSON sÃ£o simuladas e nÃ£o persistem apÃ³s um recarregamento da pÃ¡gina. Por isso, o frontend atualiza o estado local depois de cada operaÃ§Ã£o bem-sucedida.

## Build de produÃ§Ã£o

```bash
npm run build
```

