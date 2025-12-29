# 📈 Investment Portfolio Manager

![Status](https://img.shields.io/badge/STATUS-CONCLUÍDO-brightgreen?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)

O **Investment Portfolio Manager** é uma aplicação Full Stack desenvolvida para o gerenciamento de portfólios de investimentos. O sistema permite o cadastro de ativos, acompanhamento de valores e visualização de resumos financeiros, utilizando uma arquitetura robusta com **Java Spring Boot** no backend e **React** no frontend.

---

## 🚀 Funcionalidades

### 💼 Gestão de Investimentos
* **CRUD Completo:** Adicionar, editar, visualizar e remover investimentos do portfólio.
* **Tipos de Investimentos:** Suporte a diversas categorias de ativos (Ações, Fundos, Renda Fixa, etc.) definidos via Enum.
* **Dados de Mercado:** Integração preparada para consulta de dados de mercado (`MarketDataService`).

### 📊 Análise de Portfólio
* **Resumo Financeiro:** Visualização consolidada do valor total do portfólio.
* **Interface Responsiva:** Frontend moderno e rápido construído com Vite e React.

---

## 🛠️ Stack Tecnológica

### Backend (API)
* **Linguagem:** [Java 17+](https://www.oracle.com/java/)
* **Framework:** [Spring Boot](https://spring.io/projects/spring-boot) (Web, JPA)
* **Banco de Dados:** [PostgreSQL](https://www.postgresql.org/)
* **Build Tool:** [Maven](https://maven.apache.org/)

### Frontend (Cliente)
* **Framework:** [React](https://react.dev/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
* **HTTP Client:** [Axios](https://axios-http.com/)

### Infraestrutura
* **Containerização:** [Docker](https://www.docker.com/) & Docker Compose (para o Banco de Dados)

---

## ⚡ Instalação e Execução

Siga os passos abaixo para rodar o projeto completo em sua máquina.

### 1. Pré-requisitos
* **Java JDK 17+**
* **Node.js** (v18+)
* **Docker** e **Docker Compose**

### 2. Clonar o repositório

```bash
git clone [https://github.com/victoriacarvalho/final-web-2-project.git](https://github.com/victoriacarvalho/final-web-2-project.git)
cd final-web-2-project

```

### 3. Configurar e Rodar o Banco de Dados

O projeto utiliza Docker Compose para subir uma instância do PostgreSQL automaticamente.

```bash
docker-compose up -d

```

*Isso iniciará o banco de dados na porta `5432` com as credenciais configuradas no `docker-compose.yaml`.*

### 4. Rodar o Backend (Spring Boot)

1. Abra um terminal na raiz do projeto (onde está o `pom.xml`).
2. Execute o comando Maven para rodar a aplicação:
```bash
./mvnw spring-boot:run

```


*(No Windows, utilize `mvnw.cmd spring-boot:run`)*
O servidor iniciará normalmente na porta `8080`.

### 5. Rodar o Frontend (React)

1. Abra um novo terminal e acesse a pasta `frontend`:
```bash
cd frontend

```


2. Instale as dependências:
```bash
npm install

```


3. Execute o servidor de desenvolvimento:
```bash
npm run dev

```


Acesse a aplicação em `http://localhost:5173`.

---

## 📂 Estrutura do Projeto

```bash
final-web-2-project/
├── src/main/java/com/investments/  # Código Fonte Backend
│   ├── controller/                 # Controladores REST
│   ├── service/                    # Regras de Negócio
│   ├── model/                      # Entidades JPA
│   ├── repositories/               # Interfaces de acesso a dados
│   └── dtos/                       # Objetos de Transferência de Dados
├── frontend/                       # Código Fonte Frontend
│   ├── src/components/             # Componentes React (Forms, Listas, Modais)
│   ├── src/services/               # Configuração da API (Axios)
│   └── ...
├── docker-compose.yaml             # Configuração do PostgreSQL Docker
├── create-database-investments.sql # Script SQL de inicialização
└── pom.xml                         # Dependências Maven



---

## 🤝 Contribuição

Contribuições são bem-vindas!

1. Faça um **Fork** do projeto.
2. Crie uma Branch: `git checkout -b feature/NovaFeature`.
3. Faça o Commit: `git commit -m 'Adiciona nova feature'`.
4. Faça o Push: `git push origin feature/NovaFeature`.
5. Abra um **Pull Request**.

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

## 👩‍💻 Autora

Desenvolvido por **Victória Carvalho**
