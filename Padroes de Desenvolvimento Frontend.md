# Padrões de Desenvolvimento Front-End (React + TypeScript)

## 1. Papel e objetivo

Atue como um desenvolvedor Front-End Sênior, especialista em React e TypeScript.

Siga rigorosamente as regras de arquitetura, organização, gerenciamento de estado, integração com APIs, tratamento de erros, autenticação, responsividade e acessibilidade descritas neste documento.

O código deve seguir um padrão organizado, modular e adequado a um ambiente acadêmico e profissional. Não ignore as regras estabelecidas.

## 2. Stack tecnológica

- **Vite:** ferramenta de criação e execução do projeto.
- **React 18 ou 19:** biblioteca principal da interface.
- **TypeScript:** utilizar tipagem estrita para props, estados, interfaces e retornos de APIs.
- **React Router DOM v7:** utilizar `BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `Outlet`, `Navigate` e `useNavigate` para navegação.
- **Axios 1.x:** utilizar como padrão para comunicação HTTP, com instância centralizada e tratamento de respostas e erros.
- **Variáveis de ambiente:** utilizar `.env` com o prefixo `VITE_` para configurações como a URL da API.

## 3. Arquitetura e organização de pastas

O projeto deve ser modular. É proibido concentrar toda a aplicação em um único arquivo ou componente monolítico.

Utilize a seguinte organização:

```text
src/
├── components/
│   ├── Header.tsx
│   └── ...
├── contexts/
│   └── AuthContext.tsx
├── pages/
│   ├── Login.tsx
│   └── ...
├── routes/
│   └── ProtectedRoute.tsx
├── services/
│   ├── http.ts
│   ├── auth.ts
│   └── ...
├── utils/
│   └── erros.ts
├── types.ts
├── App.tsx
└── main.tsx
```

Responsabilidade de cada pasta:

- `pages/`: uma tela por rota. Componentes de página devem utilizar `export default`.
- `components/`: componentes reutilizáveis de interface, como Header, botões, cards e itens de listas.
- `services/`: toda a comunicação com APIs e lógica de requisições. Arquivos dessa pasta não devem conter JSX.
- `contexts/`: gerenciamento de estado global compartilhado, como autenticação.
- `routes/`: componentes e mecanismos relacionados ao roteamento e à proteção de rotas.
- `utils/`: funções auxiliares, como tradução de erros HTTP para mensagens amigáveis.
- `types.ts`: interfaces e tipos globais utilizados em diferentes partes da aplicação.

## 4. Componentização e responsabilidade única

- Cada componente deve ter uma única responsabilidade.
- Não concentre listagem, pesquisa, formulário e tratamento de erros em um único componente.
- Divida componentes grandes em componentes menores e reutilizáveis.
- Compartilhe dados e funções entre componentes por meio de props quando apropriado.
- Utilize Context API somente para dados globais necessários em diferentes partes da aplicação, evitando prop drilling desnecessário.

## 5. Gerenciamento de estado e imutabilidade

- Nunca modifique diretamente um estado do React.
- É proibido utilizar `push`, `splice` ou `sort` diretamente sobre arrays armazenados no estado.
- Para adicionar elementos, utilize o operador spread:

```tsx
setLista((atual) => [...atual, novoItem]);
```

- Para editar elementos, utilize `map()`:

```tsx
setLista((atual) =>
  atual.map((item) =>
    item.id === id ? { ...item, ...alteracoes } : item
  )
);
```

- Para remover elementos, utilize `filter()`:

```tsx
setLista((atual) => atual.filter((item) => item.id !== id));
```

- Não armazene estados derivados. Valores que podem ser calculados a partir de outros estados, como listas filtradas, quantidades e totais, devem ser calculados durante a renderização, utilizando `filter()`, `reduce()` ou `map()`.
- Ao renderizar listas, utilize sempre uma chave estável, preferencialmente `key={item.id}`.
- Nunca utilize o índice do array como `key` em listas que podem sofrer alterações.

### Closures e atualização de estado

- Tenha atenção às closures desatualizadas (*stale closures*), especialmente em `useEffect`, `setTimeout` e `setInterval`.
- Quando uma atualização depender do valor anterior do estado, utilize sempre a forma funcional:

```tsx
setValor((atual) => atual + 1);
```

## 6. Formulários controlados

Todos os formulários devem utilizar componentes controlados.

- O valor de cada campo deve estar vinculado ao estado por meio de `value`.
- Toda alteração deve atualizar o estado por meio de `onChange`.
- O evento `onSubmit` deve executar `e.preventDefault()` como primeira instrução, evitando o recarregamento da página.
- Utilize validação antes de enviar dados à API.
- Mostre mensagens de validação próximas ao campo correspondente.
- Utilize `aria-invalid` quando houver erro de validação.
- Durante requisições, desabilite o botão de envio com `disabled={enviando}`.
- Altere o texto do botão durante o envio, por exemplo, de "Adicionar" para "Salvando...".
- Preserve os dados digitados quando uma requisição falhar, permitindo que a pessoa corrija o formulário.

## 7. Comunicação com APIs

### 7.1. Instância centralizada

Utilize uma instância Axios criada com `axios.create()` em `src/services/http.ts`.

A URL base deve vir de uma variável de ambiente:

```env
VITE_API_URL=https://dummyjson.com
```

Utilize `import.meta.env.VITE_API_URL` para acessar a variável.

Não espalhe URLs completas da API pelos componentes.

Configure os interceptors necessários para autenticação e tratamento global de erros.

### 7.2. Organização dos serviços

Toda comunicação com APIs deve ficar dentro de `src/services/`.

- Crie funções assíncronas específicas para cada operação.
- Componentes não devem montar URLs, headers e requisições diretamente.
- Componentes devem chamar as funções dos serviços e atualizar os estados da interface com os resultados.
- Utilize tipos TypeScript para os parâmetros e retornos das funções.
- Quando houver múltiplas requisições independentes que precisem ser executadas em paralelo, utilize `Promise.all()`.

### 7.3. Tratamento de requisições

Toda chamada assíncrona à API realizada pela interface deve seguir o padrão `try/catch/finally`.

Ordem obrigatória:

1. Ativar o estado de carregamento ou envio.
2. Executar a chamada ao serviço dentro de `try`.
3. Tratar falhas dentro de `catch`, utilizando a função centralizada de tradução de erros.
4. Desativar o estado de carregamento ou envio dentro de `finally`.

O `finally` deve garantir que a interface volte a responder mesmo quando a requisição falhar.

Nunca deixe o estado de carregamento desligar somente dentro de `try`.

### 7.4. Fetch como alternativa

Caso seja necessário utilizar `fetch` em vez de Axios:

- Verifique obrigatoriamente `res.ok`.
- Se a resposta não for bem-sucedida, lance um erro utilizando o status HTTP.
- Não presuma que `fetch` lança erros automaticamente para respostas HTTP 400 ou 500.

### 7.5. APIs simuladas e DummyJSON

A API DummyJSON utilizada nas aulas simula operações de criação, edição e exclusão, mas não persiste essas alterações no servidor.

Portanto:

- Após uma operação bem-sucedida de POST, PATCH ou DELETE, atualize imediatamente o estado local da aplicação.
- A atualização deve ocorrer após o sucesso da chamada à API.
- Utilize atualizações imutáveis do estado.
- Não espere que a API mantenha os dados após um F5.
- Se um item criado localmente não existir no servidor e uma operação posterior retornar 404, trate o caso sem quebrar a interface.
- Quando necessário, utilize identificação local para distinguir itens simulados e tratar operações sobre eles adequadamente.

## 8. Estados de exibição de dados

Toda página que carrega dados deve apresentar quatro estados de interface, nesta ordem:

1. **Carregando:** enquanto os dados estão sendo buscados.
2. **Erro:** quando a requisição falhar.
3. **Vazio:** quando a requisição for bem-sucedida, mas a lista não possuir elementos.
4. **Conteúdo:** quando existirem dados para exibir.

Exemplos:

```tsx
if (loading) return <p>Carregando...</p>;

if (erro) return <p role="alert">{erro}</p>;

if (lista.length === 0) return <p>Nenhum item encontrado.</p>;

return (
  <ul>
    {lista.map((item) => (
      <li key={item.id}>{item.nome}</li>
    ))}
  </ul>
);
```

A ordem é obrigatória. O estado de carregamento deve ser verificado antes da lista vazia, evitando que a interface mostre uma mensagem de lista vazia enquanto os dados ainda estão sendo carregados.

Uma lista vazia não deve ser tratada como erro.

## 9. Tratamento centralizado de erros

Crie uma função centralizada, preferencialmente em `src/utils/erros.ts`, para transformar erros técnicos em mensagens compreensíveis.

Nunca mostre diretamente mensagens técnicas como:

`Request failed with status code 404`

Utilize as seguintes mensagens:

| Situação | Mensagem |
|---|---|
| 400 em requisições comuns | "Os dados enviados não foram aceitos. Confere o que digitou." |
| 400 ou 401 durante o login | "Usuário ou senha incorretos." |
| 401: sessão expirada | "Tua sessão expirou. Entra de novo." |
| 404 | "Não encontramos o que tu pediu. Pode ter sido removido." |
| 500 ou superior | "O servidor está com problema. Tenta de novo daqui a pouco." |
| Sem resposta da API ou sem conexão | "Sem conexão com o servidor. Confere a internet e tenta de novo." |
| Timeout | "A resposta demorou demais. Tenta de novo." |
| Erro inesperado na aplicação | "Erro inesperado no app. Tenta de novo." |

Regras adicionais:

- Utilize `axios.isAxiosError()` para identificar erros originados pelo Axios.
- Verifique `err.response` antes de acessar o status.
- Utilize `err.response.status` para identificar erros HTTP.
- Trate a ausência de resposta como falha de conexão.
- Erros de timeout devem ser identificados quando houver configuração de timeout.
- Erros inesperados no código devem receber uma mensagem genérica.
- Não utilize `err.message` diretamente como mensagem apresentada à pessoa usuária.

### Exibição dos erros

- Mensagens de erro devem aparecer na interface, não somente no console.
- Utilize `role="alert"` nos elementos que apresentam erros.
- Erros de formulário devem aparecer próximos ao formulário.
- Erros de carregamento de listas devem aparecer na área correspondente.
- O botão de envio deve permanecer desabilitado enquanto a requisição estiver em andamento.
- Durante o envio, altere o texto do botão para indicar a operação.

## 10. Autenticação e gerenciamento de sessão

Utilize Context API para gerenciar os dados globais de autenticação.

O `AuthContext.tsx` deve centralizar:

- Usuário autenticado.
- Token JWT.
- Estado inicial de carregamento da sessão.
- Função de login.
- Função de logout.

Disponibilize um hook personalizado `useAuth()` para acessar o contexto.

### 10.1. Login e persistência

- O login deve ser realizado por meio do serviço de autenticação.
- O endpoint utilizado nas aulas é `POST /auth/login`.
- O token JWT recebido deve ser armazenado no `localStorage`.
- O token também deve ficar disponível no estado do Context.
- Armazene o valor do token, não o objeto inteiro da resposta.
- O logout deve remover o token do `localStorage` e limpar os estados de autenticação.

### 10.2. Restauração de sessão

Quando a aplicação for carregada:

1. Consulte o `localStorage` para verificar se existe um token.
2. Se existir, utilize-o para validar a sessão.
3. Faça uma requisição `GET /auth/me` com o header `Authorization: Bearer <token>`.
4. Se o token for válido, restaure os dados do usuário no Context.
5. Se for inválido, limpe a sessão.
6. Mantenha o estado de carregamento ativo durante a verificação.

A aplicação não deve mostrar a tela de login momentaneamente enquanto ainda estiver verificando uma sessão válida.

### 10.3. Axios interceptors

Configure interceptors na instância Axios:

- Interceptor de requisição: inserir automaticamente o token JWT no header `Authorization: Bearer <token>`.
- Interceptor de resposta: identificar respostas 401 e realizar o logout global quando a sessão tiver expirado.
- O interceptor deve devolver a configuração da requisição quando estiver tudo correto.
- Em caso de erro, deve rejeitar a Promise.
- Não trate um 401 da própria rota de login como sessão expirada. Erros de credenciais devem ser apresentados no formulário de login.

## 11. Rotas protegidas

Utilize React Router DOM para organizar a navegação da aplicação.

- A aplicação deve utilizar `BrowserRouter`, `Routes` e `Route`.
- Utilize `Link` e `NavLink` para navegação interna.
- Nunca utilize `<a href>` para navegar entre páginas internas da SPA.
- Utilize `end` no `NavLink` da rota raiz quando necessário.
- Utilize `useNavigate` para navegação programática.

Crie um componente `ProtectedRoute.tsx` para proteger páginas que exigem autenticação.

Comportamento obrigatório:

1. Enquanto a sessão estiver sendo verificada, mostre o estado de carregamento.
2. Se não houver usuário autenticado, redirecione para `/login` utilizando `<Navigate to="/login" replace />`.
3. Se houver usuário autenticado, permita o acesso à rota protegida utilizando `<Outlet />`.

## 12. CSS e responsividade mobile-first

A interface deve ser desenvolvida com abordagem mobile-first.

### 12.1. Configuração inicial

No `index.html`, mantenha a meta viewport:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

### 12.2. Layout base

- Considere uma largura inicial de referência de 375px.
- O CSS base deve ser desenvolvido para telas pequenas.
- Utilize uma coluna como padrão.
- Evite rolagem horizontal.
- Utilize `@media (min-width: ...)` para acrescentar colunas e expandir o layout conforme a tela aumenta.
- Não utilize media queries como base do layout para telas grandes e depois tente adaptar para celulares.

### 12.3. Unidades e organização

- Evite larguras fixas em pixels.
- Prefira `rem`, `%`, `vw` e `fr`.
- Utilize `display: flex` com `flex-wrap: wrap` quando apropriado.
- Utilize CSS Grid com `grid-template-columns: 1fr` como base para listas e grades.
- Aumente o número de colunas em media queries conforme o espaço disponível.
- Utilize `clamp()` para tipografia fluida.
- Utilize `max-width` e margens automáticas para limitar e centralizar conteúdos quando necessário.

### 12.4. Elementos visuais

- Utilize `* { box-sizing: border-box; }` como reset básico.
- Imagens devem utilizar `max-width: 100%` e `height: auto`.
- Vídeos também devem respeitar a largura do contêiner.
- Utilize `srcSet` quando necessário para disponibilizar imagens em diferentes resoluções.
- Botões e campos de entrada devem possuir altura mínima de 44px.
- Utilize HTML semântico, como `header`, `main`, `nav` e `section`.

### 12.5. Testes

- Teste a interface em 375px.
- Verifique se não existe rolagem horizontal.
- Confira se os elementos continuam utilizáveis em telas maiores.
- Verifique se a navegação e os formulários funcionam em telas estreitas.

## 13. Acessibilidade

- Todo campo de formulário deve possuir um `label` associado por meio de `htmlFor` e `id`.
- Não utilize apenas `placeholder` como identificação de campos.
- Mensagens de erro e validação devem ser apresentadas em texto.
- Utilize `role="alert"` para erros de requisição e validação.
- Utilize `aria-invalid` quando um campo apresentar erro.
- Todas as imagens devem possuir `alt` adequado.
- Botões que exibem somente ícones devem possuir `aria-label`.
- Não dependa exclusivamente de cores para comunicar erros ou estados.

## 14. Ciclo de vida e limpeza de efeitos

- Utilize `useEffect` para operações que dependem do ciclo de vida do componente, como carregamento inicial de dados.
- Não execute chamadas de API diretamente no corpo do componente, pois isso pode provocar requisições a cada renderização.
- Declare as dependências corretamente.
- Utilize `[]` quando o efeito precisar executar somente na montagem.
- Quando um efeito iniciar um `setInterval` ou `setTimeout`, retorne uma função de limpeza.
- Para intervalos, utilize `clearInterval(id)`.
- Para temporizadores, utilize `clearTimeout(id)`.
- Ao atualizar estados dentro de timers ou efeitos com dependências vazias, utilize atualizadores funcionais para evitar closures desatualizadas.
