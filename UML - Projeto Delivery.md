# UML — Projeto Delivery

## 1. Escopo do sistema

O sistema representa o painel administrativo de um restaurante parceiro de delivery. O usuário responsável pelo restaurante realiza autenticação e gerencia o cardápio, podendo consultar, pesquisar, cadastrar, editar e excluir pratos.

O documento utiliza diagramas Mermaid com notação UML para representar os requisitos funcionais, a organização arquitetural, as entidades principais e os fluxos críticos do sistema.

## 2. Diagrama de casos de uso

```mermaid
flowchart LR
    Usuario([Responsável pelo restaurante])
    API[(API DummyJSON ou backend próprio)]

    UC1((Autenticar usuário))
    UC2((Restaurar sessão))
    UC3((Visualizar cardápio))
    UC4((Pesquisar pratos))
    UC5((Cadastrar prato))
    UC6((Editar prato))
    UC7((Excluir prato))
    UC8((Confirmar exclusão))
    UC9((Encerrar sessão))
    UC10((Visualizar mensagens de carregamento, erro e lista vazia))

    Usuario --> UC1
    Usuario --> UC3
    Usuario --> UC4
    Usuario --> UC5
    Usuario --> UC6
    Usuario --> UC7
    Usuario --> UC9

    UC7 -. inclui .-> UC8
    UC3 -. inclui .-> UC10
    UC4 -. inclui .-> UC10
    UC5 -. inclui .-> UC10
    UC6 -. inclui .-> UC10
    UC7 -. inclui .-> UC10

    UC1 --> API
    UC2 --> API
    UC3 --> API
    UC4 --> API
    UC5 --> API
    UC6 --> API
    UC7 --> API
    UC9 --> API

    UC1 -. autentica e libera .-> UC3
    UC2 -. valida .-> UC3
```

### Casos de uso principais

| Caso de uso | Ator | Resultado esperado |
|---|---|---|
| Autenticar usuário | Responsável pelo restaurante | Token recebido, armazenado e sessão iniciada. |
| Restaurar sessão | Sistema | Token existente é validado e o usuário é restaurado, ou a sessão é limpa. |
| Visualizar cardápio | Responsável autenticado | Pratos são carregados e exibidos com foto, nome, cozinha e preço. |
| Pesquisar pratos | Responsável autenticado | Lista exibida é filtrada por nome. |
| Cadastrar prato | Responsável autenticado | Novo prato é enviado e incluído no estado local após sucesso. |
| Editar prato | Responsável autenticado | Dados do prato são atualizados no estado local após sucesso. |
| Excluir prato | Responsável autenticado | Exclusão é confirmada, enviada e refletida no estado local. |
| Encerrar sessão | Responsável autenticado | Token é removido e o acesso protegido é encerrado. |

## 3. Diagrama de componentes e arquitetura

```mermaid
flowchart TB
    Browser[ Navegador ]

    subgraph Frontend[Frontend React + TypeScript + Vite]
        Main[main.tsx]
        App[App.tsx]
        Router[React Router]
        AuthContext[AuthContext]
        ProtectedRoute[ProtectedRoute]

        subgraph Pages[Páginas]
            Login[Login]
            Menu[Cardápio]
            NotFound[Outras páginas ou fallback]
        end

        subgraph Components[Componentes reutilizáveis]
            Header[Header]
            DishCard[DishCard]
            DishForm[DishForm]
            SearchBar[SearchBar]
            Feedback[Loading, Error e Empty states]
            ConfirmDialog[Confirmação de exclusão]
        end

        subgraph Services[Serviços]
            Http[Cliente HTTP]
            AuthService[Serviço de autenticação]
            RecipeService[Serviço de pratos]
        end

        subgraph Utils[Utilitários e tipos]
            ErrorMapper[Tradutor de erros]
            Types[Tipos TypeScript]
            Price[Regra de cálculo do preço]
        end
    end

    API[(DummyJSON ou backend próprio)]
    Storage[(localStorage)]
    Env[.env: VITE_API_URL]

    Browser --> Main
    Main --> App
    App --> Router
    Router --> AuthContext
    Router --> ProtectedRoute
    Router --> Login
    ProtectedRoute --> Menu

    Menu --> Header
    Menu --> SearchBar
    Menu --> DishCard
    Menu --> DishForm
    Menu --> ConfirmDialog
    Menu --> Feedback

    AuthContext --> AuthService
    AuthService --> Http
    RecipeService --> Http
    Http --> API
    Http --> Storage
    Http --> Env

    AuthContext --> ErrorMapper
    RecipeService --> ErrorMapper
    DishCard --> Price
    DishForm --> Types
    RecipeService --> Types
    AuthService --> Types
```

### Responsabilidades dos componentes

| Componente ou módulo | Responsabilidade |
|---|---|
| `main.tsx` | Inicializar a aplicação React. |
| `App.tsx` | Compor a aplicação e a estrutura de rotas. |
| `AuthContext` | Centralizar usuário, token, carregamento da sessão, login e logout. |
| `ProtectedRoute` | Impedir o acesso ao cardápio sem autenticação válida. |
| `Login` | Exibir e validar o formulário de login. |
| `Menu` | Coordenar carregamento, busca e operações do cardápio. |
| `Header` | Exibir a identidade do restaurante e a ação de sair. |
| `DishCard` | Apresentar os dados e as ações de cada prato. |
| `DishForm` | Cadastrar ou editar um prato por meio de formulário controlado. |
| `SearchBar` | Receber o termo de busca. |
| `ConfirmDialog` | Solicitar confirmação antes da exclusão. |
| `Feedback` | Exibir carregando, erro e lista vazia. |
| `AuthService` | Executar operações de autenticação. |
| `RecipeService` | Executar operações relacionadas aos pratos. |
| `Http` | Centralizar base URL, token, requisições e respostas HTTP. |
| `ErrorMapper` | Converter erros técnicos em mensagens compreensíveis. |
| `Price` | Aplicar a regra de cálculo e formatação do preço. |

## 4. Diagrama de classes do domínio

```mermaid
classDiagram
    class User {
        +number id
        +string username
        +string email
        +string firstName
        +string lastName
        +string image
    }

    class AuthSession {
        +User user
        +string accessToken
        +boolean isLoading
        +login(credentials)
        +logout()
        +restoreSession()
    }

    class LoginCredentials {
        +string username
        +string password
    }

    class Dish {
        +number id
        +string name
        +string cuisine
        +string image
        +number prepTimeMinutes
        +number cookTimeMinutes
        +calculatePrice() number
    }

    class DishFormData {
        +string name
        +string cuisine
        +string image
        +number prepTimeMinutes
        +number cookTimeMinutes
    }

    class RecipeListResponse {
        +Dish[] recipes
        +number total
        +number skip
        +number limit
    }

    class AuthService {
        +login(credentials) AuthSession
        +getCurrentUser() User
    }

    class RecipeService {
        +listRecipes(params) RecipeListResponse
        +searchRecipes(query) Dish[]
        +getRecipe(id) Dish
        +createRecipe(data) Dish
        +updateRecipe(id, data) Dish
        +deleteRecipe(id) void
    }

    class HttpClient {
        +string baseURL
        +request(config)
        +setAuthorization(token)
        +clearAuthorization()
    }

    class ErrorMapper {
        +toUserMessage(error, context) string
    }

    class PriceCalculator {
        +calculate(prepTime, cookTime) number
        +formatBRL(value) string
    }

    AuthSession "1" *-- "0..1" User : mantém
    AuthService --> LoginCredentials : recebe
    AuthService --> AuthSession : cria
    AuthService --> User : retorna
    RecipeService --> Dish : gerencia
    RecipeService --> RecipeListResponse : retorna
    DishFormData ..> Dish : dados de entrada
    Dish --> PriceCalculator : utiliza
    AuthService --> HttpClient : utiliza
    RecipeService --> HttpClient : utiliza
    AuthService --> ErrorMapper : trata erros
    RecipeService --> ErrorMapper : trata erros
```

### Regra de preço

```text
preço = 15 + 0,50 × (prepTimeMinutes + cookTimeMinutes)
```

O preço é derivado dos tempos do prato e não deve ser tratado como um campo persistido pela API.

## 5. Diagrama de sequência — login

```mermaid
sequenceDiagram
    actor Usuario as Responsável
    participant Login as Tela de Login
    participant Auth as AuthContext
    participant Service as AuthService
    participant HTTP as HttpClient
    participant API as API
    participant Storage as localStorage
    participant Router as React Router

    Usuario->>Login: Informa usuário e senha
    Login->>Login: Valida campos
    Login->>Auth: login(credentials)
    Auth->>Service: login(credentials)
    Service->>HTTP: POST /auth/login
    HTTP->>API: Envia credenciais
    API-->>HTTP: accessToken e dados do usuário
    HTTP-->>Service: Resposta de sucesso
    Service-->>Auth: Token e usuário
    Auth->>Storage: Salva accessToken
    Auth-->>Login: Sessão autenticada
    Login->>Router: Navega para o cardápio
    Router-->>Usuario: Exibe rota protegida
```

### Fluxo alternativo de login com erro

```mermaid
sequenceDiagram
    actor Usuario as Responsável
    participant Login as Tela de Login
    participant Auth as AuthContext
    participant Service as AuthService
    participant HTTP as HttpClient
    participant API as API
    participant Errors as ErrorMapper

    Usuario->>Login: Envia credenciais inválidas
    Login->>Auth: login(credentials)
    Auth->>Service: login(credentials)
    Service->>HTTP: POST /auth/login
    HTTP->>API: Envia credenciais
    API-->>HTTP: Erro 400 ou 401
    HTTP-->>Service: Rejeita requisição
    Service->>Errors: Converte erro
    Errors-->>Login: Usuário ou senha incorretos
    Login-->>Usuario: Exibe mensagem na tela
```

## 6. Diagrama de sequência — carregamento do cardápio

```mermaid
sequenceDiagram
    actor Usuario as Responsável autenticado
    participant Page as Tela do Cardápio
    participant Effect as useEffect
    participant Service as RecipeService
    participant HTTP as HttpClient
    participant API as API
    participant State as Estado local

    Usuario->>Page: Acessa o cardápio
    Page->>State: loading = true
    Page->>Effect: Executa carregamento inicial
    Effect->>Service: listRecipes()
    Service->>HTTP: GET /recipes
    HTTP->>API: Solicita lista de pratos
    API-->>HTTP: recipes[]
    HTTP-->>Service: Lista de pratos
    Service-->>Effect: Resultado
    Effect->>State: Atualiza lista local
    Effect->>State: loading = false
    State-->>Page: Renderiza conteúdo ou estado vazio
    Page-->>Usuario: Exibe cardápio
```

### Fluxo alternativo de carregamento com erro

```mermaid
sequenceDiagram
    participant Page as Tela do Cardápio
    participant Service as RecipeService
    participant HTTP as HttpClient
    participant API as API
    participant Errors as ErrorMapper
    participant State as Estado local

    Page->>State: loading = true
    Page->>Service: listRecipes()
    Service->>HTTP: GET /recipes
    HTTP->>API: Solicita lista
    API-->>HTTP: Erro HTTP ou falha de conexão
    HTTP-->>Service: Rejeita requisição
    Service->>Errors: Converte erro e status
    Errors-->>State: Define mensagem amigável
    State->>State: loading = false
    State-->>Page: Exibe erro com role="alert"
```

## 7. Diagrama de sequência — criar, editar e excluir prato

```mermaid
sequenceDiagram
    actor Usuario as Responsável autenticado
    participant Page as Tela do Cardápio
    participant Form as DishForm
    participant Confirm as Confirmação
    participant Service as RecipeService
    participant HTTP as HttpClient
    participant API as API
    participant State as Estado local

    Usuario->>Form: Preenche dados do prato
    Form->>Form: Valida campos
    Form->>Page: onSubmit(data)
    Page->>State: saving = true
    Page->>Service: createRecipe(data)
    Service->>HTTP: POST /recipes/add
    HTTP->>API: Envia dados
    API-->>HTTP: Prato criado de forma simulada
    HTTP-->>Service: Prato retornado
    Service-->>Page: Resultado
    Page->>State: Adiciona prato ao estado local
    Page->>State: saving = false
    Page-->>Usuario: Atualiza o cardápio

    Usuario->>Page: Solicita edição
    Page->>Form: Abre dados do prato
    Usuario->>Form: Altera dados
    Form->>Page: onSubmit(data)
    Page->>Service: updateRecipe(id, data)
    Service->>HTTP: PATCH /recipes/:id
    HTTP->>API: Envia alterações
    API-->>HTTP: Resultado simulado
    HTTP-->>Service: Prato atualizado
    Service-->>Page: Resultado
    Page->>State: Substitui prato de forma imutável
    Page-->>Usuario: Atualiza o cardápio

    Usuario->>Page: Solicita exclusão
    Page->>Confirm: Exibe confirmação
    Usuario->>Confirm: Confirma exclusão
    Confirm->>Page: onConfirm()
    Page->>Service: deleteRecipe(id)
    Service->>HTTP: DELETE /recipes/:id
    HTTP->>API: Solicita exclusão
    API-->>HTTP: Sucesso ou 404 para o id 51
    HTTP-->>Service: Resultado
    Service-->>Page: Resultado
    Page->>State: Remove prato ou exibe erro claro
    Page-->>Usuario: Atualiza o cardápio
```

## 8. Estados principais da interface

```mermaid
stateDiagram-v2
    [*] --> VerificandoSessao
    VerificandoSessao --> Login: Sem token ou token inválido
    VerificandoSessao --> Cardapio: Token válido

    Login --> Login: Credenciais inválidas
    Login --> Cardapio: Login realizado

    Cardapio --> Carregando: Buscar dados
    Carregando --> Erro: Requisição falhou
    Carregando --> Vazio: Lista sem itens
    Carregando --> Conteudo: Lista com itens

    Erro --> Carregando: Tentar novamente
    Vazio --> FormularioNovo: Cadastrar prato
    Conteudo --> FormularioNovo: Cadastrar prato
    Conteudo --> FormularioEdicao: Editar prato
    Conteudo --> ConfirmandoExclusao: Excluir prato

    FormularioNovo --> Salvando: Enviar formulário
    FormularioEdicao --> Salvando: Enviar formulário
    Salvando --> Conteudo: Sucesso e atualização local
    Salvando --> FormularioNovo: Erro ao cadastrar
    Salvando --> FormularioEdicao: Erro ao editar

    ConfirmandoExclusao --> Conteudo: Cancelar
    ConfirmandoExclusao --> Excluindo: Confirmar
    Excluindo --> Conteudo: Sucesso e remoção local
    Excluindo --> Erro: Falha ou 404

    Cardapio --> Login: Sair
```

## 9. Regras de implementação representadas no UML

1. O usuário não acessa o cardápio sem uma sessão válida.
2. O token deve ser salvo no `localStorage` após o login.
3. A API deve ser acessada por serviços centralizados, e não diretamente pelos componentes de interface.
4. O cardápio deve manter estados distintos de carregamento, erro, vazio e conteúdo.
5. Criar, editar e excluir devem atualizar o estado local após o sucesso da operação simulada.
6. A exclusão deve exigir confirmação antes da chamada à API.
7. Erros devem ser convertidos em mensagens compreensíveis e exibidos na interface.
8. O preço deve ser calculado a partir dos tempos de preparo e cozimento.
9. A interface deve funcionar em 375 px sem rolagem horizontal.
10. A arquitetura deve permanecer modular, com componentes reutilizáveis e responsabilidades separadas.
