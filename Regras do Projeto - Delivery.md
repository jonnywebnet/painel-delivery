# Regras do Projeto — Delivery

## 1. Contexto do trabalho

- Trabalho P2 de Laboratório de Programação Front End — Engenharia de Software — 2026.2.
- O projeto deve ser um app de delivery para o painel de um restaurante parceiro.
- O painel deve permitir que o responsável pelo restaurante faça login e gerencie o cardápio.
- A dupla escolhe o nome do restaurante e as cores da interface.
- Não utilizar marca nem logo de aplicativos reais.
- O app deve ser usável principalmente em celulares, inclusive em uma tela de 375 px.
- Criar um app novo, do zero, sem copiar a pasta do FlyNow ou do portfólio.

## 2. Stack e organização obrigatórias

- Utilizar React + TypeScript + Vite.
- Utilizar módulos com `import` e `export`.
- Criar uma pasta `services/` para os serviços de API, usando `fetch` ou Axios.
- Utilizar componentes reutilizáveis: pelo menos 3 componentes com props, como card do prato, formulário e cabeçalho.
- Utilizar `useState` para o estado da interface.
- Utilizar Context para autenticação.
- Utilizar React Router para a rota protegida.
- A aplicação deve passar em `npm run build` sem erros.

## 3. Variáveis de ambiente e API

- A URL da API deve ser lida por meio da variável de ambiente do Vite.
- Não colar a URL fixa da API no código.
- Criar o arquivo `.env` na raiz do projeto front:

```env
VITE_API_URL=https://dummyjson.com
```

- No código, acessar a variável com `import.meta.env.VITE_API_URL`.
- Reiniciar `npm run dev` depois de criar ou editar o `.env`.
- A API é pública e não exige chave.
- Um backend próprio é opcional. Se utilizado, ele deve substituir o DummyJSON, respeitar a variável `VITE_API_URL`, manter a mesma rubrica e ser incluído no ZIP sem `node_modules`.
- O serviço de API deve ser escrito pelo projeto.
- Não utilizar os recursos `/todos`, `/users` ou `/posts`.

### Comportamento simulado do DummyJSON

- A API apenas simula as operações de criação, edição e exclusão.
- POST, PATCH e DELETE respondem como sucesso, mas não persistem as alterações no servidor.
- Depois de salvar, o app deve atualizar imediatamente o estado local.
- Depois de recarregar a página, a lista volta ao conteúdo existente na API; isso é esperado.
- O prato criado pela dupla recebe sempre o id `51` e não existe de verdade no servidor.
- Editar ou excluir esse prato pode retornar erro 404; o app deve mostrar uma mensagem clara sem quebrar a interface.

## 4. Conta de teste e autenticação

- Usuário de teste: `emilys`.
- Senha de teste: `emilyspass`.
- O login retorna `accessToken`.
- As rotas protegidas usam o header:

```text
Authorization: Bearer <accessToken>
```

- O login deve guardar o token.
- O cardápio só pode aparecer depois do login.
- Deve existir um botão `Sair`.

## 5. Endpoints obrigatórios

| Método | Rota | Autenticação | Finalidade |
|---|---|---|---|
| `POST` | `/auth/login` | Não | Login; retorna `accessToken`. |
| `GET` | `/auth/me` | Bearer | Conferir o usuário logado. |
| `GET` | `/recipes` | Não | Listar pratos; resposta em `recipes`; aceitar `limit`, `skip` e `select`. |
| `GET` | `/recipes/search?q=` | Não | Buscar pratos por nome. |
| `GET` | `/recipes/:id` | Não | Consultar o detalhe de um prato. |
| `POST` | `/recipes/add` | Não | Criar prato de forma simulada; enviar nome, cozinha e tempos. |
| `PATCH` | `/recipes/:id` | Não | Editar prato de forma simulada. |
| `DELETE` | `/recipes/:id` | Não | Excluir prato de forma simulada. |

## 6. Dados dos pratos e preço

Utilizar os seguintes campos do recurso `Recipes` do DummyJSON:

- `name`
- `cuisine`
- `image`
- `prepTimeMinutes`
- `cookTimeMinutes`

A API não possui preço. Calcular o preço conforme a regra do trabalho:

```text
preço = 15 + 0,50 × (tempo de preparo + tempo de cozimento)
```

Exibir o valor formatado em reais.

## 7. Funcionalidades obrigatórias

- Login com usuário e senha usando `POST /auth/login`.
- Persistência do token e autenticação da sessão.
- Rota protegida para o cardápio.
- Botão para sair da aplicação.
- Lista de pratos com foto, nome, cozinha e preço.
- Busca de pratos por nome.
- Cadastro de novo prato.
- Edição de prato.
- Exclusão de prato com confirmação.
- Atualização da lista depois de criar, editar ou excluir.
- Mensagens de carregamento, erro e lista vazia.
- Mensagens de erro visíveis na tela, com o status lido.
- Componentes reutilizáveis e organizados.

## 8. Estados e comportamento da interface

- Utilizar `useEffect` para carregar o cardápio.
- Renderizar a lista com `map` e uma `key` estável.
- Implementar a busca utilizando `filter`.
- Exibir estado de carregamento enquanto os dados são buscados.
- Exibir estado de erro quando uma requisição falhar.
- Exibir estado de lista vazia quando não houver pratos.
- Exibir o conteúdo quando houver pratos disponíveis.
- Atualizar o estado local depois de operações simuladas bem-sucedidas.
- Nenhum botão ou link pode ficar sem ação.

## 9. Tratamento de erros

- Requisições assíncronas devem utilizar `try/catch/finally`.
- O status HTTP deve ser lido e considerado no tratamento.
- A mensagem de erro deve aparecer na interface, não apenas no console.
- Tratar claramente o erro 404 ao editar ou excluir o prato criado localmente com id `51`.
- O estado de carregamento ou envio deve ser finalizado mesmo quando a requisição falhar.

## 10. Responsividade

- A interface deve funcionar em 375 px.
- Não pode haver rolagem lateral.
- A tela deve permanecer usável em celulares e em telas maiores.
- Testar navegação, formulários, busca e operações do cardápio em tela estreita.

## 11. Entrega

- Entregar somente pelo AVA, na tarefa `Trabalho P2 · Delivery (3,0)`.
- Enviar um ZIP individual pelo AVA.
- O ZIP não pode conter `node_modules`.
- O `README.md` deve conter:
  - nome completo do responsável pelo projeto;
  - instruções para rodar o projeto;
- Se houver uma pasta de backend próprio, ela deve ser incluída no ZIP sem `node_modules`.

## 12. Conferência antes da entrega

- Executar `npm run dev` e confirmar que a página abre.
- Clicar em tudo que o trabalho pede e confirmar que funciona.
- Confirmar que não existe botão ou link sem ação.
- Testar a interface em uma tela estreita de celular.
- Confirmar que não há rolagem lateral.
- Verificar que o console do navegador não apresenta erro vermelho.
- Executar `npm run build` sem erros.
- Confirmar que o ZIP não contém `node_modules`.
- Confirmar que o README contém o nome do responsável e as instruções para rodar o projeto.

## 13. Critérios de avaliação

| Critério | Pontos |
|---|---:|
| Projeto organizado: Vite + TypeScript, `.env`, pasta `services/` com fetch ou Axios, módulos import/export, `npm run build` sem erro e README com o responsável | 0,3 |
| Controle de versão e documentação, quando aplicável | 0,2 |
| Componentes reutilizáveis: pelo menos 3, com props, e estado com `useState` | 0,3 |
| Login com token, Context, rota protegida com Router e Sair | 0,5 |
| Cardápio: `useEffect` para carregar, lista com `map` e `key`, busca com `filter`, carregando e vazio | 0,5 |
| Criar, editar e excluir com confirmação; lista atualizada depois de salvar | 0,6 |
| Tratamento correto de erro: `try/catch/finally`, status lido e mensagem na tela | 0,3 |
| Funcionamento no celular em 375 px, sem rolagem lateral | 0,3 |
| **Total** | **3,0** |
