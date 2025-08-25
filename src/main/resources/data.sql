-- Limpa a tabela antes de inserir novos dados para evitar duplicatas ao reiniciar
TRUNCATE TABLE investments RESTART IDENTITY;

-- Insere dados de exemplo na tabela de investimentos
INSERT INTO investments (type, symbol, quantity, purchase_price, purchase_date) VALUES
('ACAO', 'PETR4', 100, 28.44, '2023-01-15'),
('ACAO', 'VALE3', 50, 62.10, '2023-03-22'),
('CRIPTO', 'BTC', 1, 150000.00, '2023-02-10'),
('FUNDO', 'KNRI11', 10, 163.50, '2023-04-05'),
('RENDA_FIXA', 'TESOURO SELIC 2029', 2, 13750.00, '2023-01-20');
