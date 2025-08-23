CREATE DATABASE db_investments;
CREATE USER user_investments WITH ENCRYPTED PASSWORD 'pass_investments';
GRANT ALL PRIVILEGES ON DATABASE db_investments TO user_investments;