-- Este script garante que o banco de dados e o usuário sejam criados apenas se não existirem.

-- Cria o usuário (role) apenas se ele ainda não existir.
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'user_investments') THEN

      CREATE ROLE user_investments LOGIN PASSWORD 'pass_investments';
   END IF;
END
$do$;

-- Cria o banco de dados apenas se ele não existir e define o proprietário.
-- A verificação de existência precisa ser feita antes do comando CREATE DATABASE.
-- Este bloco não é transacional, então executamos separadamente.
SELECT 'CREATE DATABASE db_investments'
WHERE NOT EXISTS (SELECT FROM pg_database WHERE datname = 'db_investments');

-- Concede todos os privilégios no banco de dados para o usuário.
-- Este comando funcionará corretamente se o banco e o usuário já existirem.
GRANT ALL PRIVILEGES ON DATABASE db_investments TO user_investments;
