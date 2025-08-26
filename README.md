Gestor de Carteira de Investimentos
Uma aplicação full-stack para gestão de um portfólio de investimentos. O sistema permite o registo de ativos (ações, cripto, etc.), calcula o resumo da carteira .
A API é construída com Java/Spring Boot e a interface é uma SPA em React/TypeScript, com o ambiente totalmente containerizado em Docker.
Tecnologias Principais
 * Backend: Java 17, Spring Boot 3, Spring Data JPA, PostgreSQL
 * Frontend: React 19, TypeScript, Vite, Axios
 * Ambiente: Docker, Docker Compose
Como Executar
O ambiente é projetado para ser executado com Docker, simplificando a configuração.
Pré-requisitos:
 * Docker e Docker Compose
 * Node.js (v18+)
1. Iniciar o Backend e o Banco de Dados
Na raiz do projeto, execute o comando abaixo. Ele irá construir e iniciar os containers do backend e do banco de dados.
docker-compose up --build

A API estará disponível em http://localhost:8083.
2. Iniciar o Frontend
Num novo terminal, navegue até à pasta frontend e execute os seguintes comandos:
cd frontend
npm install
npm run dev

A aplicação estará acessível no seu navegador em http://localhost:3000.
Estrutura do Projeto
 * / (raiz): Contém os arquivos do backend (Spring Boot) e o docker-compose.yml.
 * /frontend: Contém a aplicação frontend (React).
Endpoints da API
 * GET /investments: Lista todos os ativos (filtro opcional: ?type=ACAO).
 * POST /investments: Cria um novo ativo.
 * PUT /investments/{id}: Atualiza a quantidade e o preço de um ativo.
 * DELETE /investments/{id}: Remove um ativo.
 * GET /investments/summary: Retorna o resumo da carteira.
 * POST /investments/update-market-prices: Simula uma atualização dos preços de mercado.
Exemplos de requisição podem ser encontrados no ficheiro investment.rest.
