# Sistema de Registro de Carga Horária

Este é um sistema web para registro e acompanhamento da carga horária dos membros de uma equipe.

## Funcionalidades

- Cadastro de membros da equipe
- Registro de horas trabalhadas
- Visualização de histórico de horas
- Interface intuitiva e responsiva

## Requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITÓRIO]
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm start
# ou
yarn start
```

O aplicativo estará disponível em `http://localhost:3000`

## Estrutura do Projeto

- `src/components/` - Componentes reutilizáveis
- `src/pages/` - Páginas da aplicação
- `src/styles/` - Estilos globais
- `public/` - Arquivos estáticos

## Tecnologias Utilizadas

- React
- React Router
- Styled Components
- Axios
- date-fns

## Próximos Passos

- Implementar backend para persistência de dados
- Adicionar autenticação de usuários
- Implementar relatórios e gráficos
- Adicionar exportação de dados 