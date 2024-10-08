# Notex Web

## Descrição

Este é o projeto front-end do **Notex Web**, uma aplicação React com TypeScript, utilizando Vite como bundler. O projeto usa diversas bibliotecas para a criação de UI e gerenciamento de formulários, como Radix UI, React Hook Form e Zod.

## Requisitos

- Node.js (versão 18.x ou superior)
- NPM ou Yarn
- Banco de dados ou API backend funcionando (assumido que seja o projeto backend já fornecido)

## Passos para configurar o ambiente de desenvolvimento

1. Clone o repositório:

   ```bash
   git clone https://github.com/DevSolto/Notex-Web.git
   cd Notex-Web
   ```

2. Instale as dependências:

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Crie o arquivo `.env` na raiz do projeto para configurar as variáveis de ambiente.

   O arquivo `.env` pode conter a URL da API do backend:

   ```bash
   VITE_API_URL=http://localhost:4000
   ```

4. Rode o projeto localmente:

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

   O projeto estará disponível em `http://localhost:5173`.

## Scripts Disponíveis

- `dev`: Inicia o ambiente de desenvolvimento com Vite.
- `build`: Compila o projeto para produção.
- `lint`: Executa o linter para verificar problemas de código.
- `preview`: Pré-visualiza a versão de produção localmente.

## Tecnologias Utilizadas

- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipos estáticos.
- **TailwindCSS**: Framework de utilitários CSS para estilização.
- **Radix UI**: Componentes acessíveis e semânticos de UI.
- **React Hook Form**: Gerenciamento de formulários em React.
- **Zod**: Validação de esquema e parsing de objetos.

## Estrutura de Pastas

- `src/`: Contém todo o código-fonte do projeto.
  - `components/`: Componentes reutilizáveis de UI.
  - `pages/`: Páginas da aplicação.

## Observações

- Certifique-se de que o backend está rodando corretamente e que a URL configurada no `.env` aponta para ele.
