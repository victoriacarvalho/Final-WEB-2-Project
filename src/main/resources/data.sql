-- src/main/resources/data.sql

INSERT INTO investments (type, symbol, quantity, purchase_price, purchase_date, market_price) VALUES
('ACAO', 'PETR4', 100, 28.44, '2023-01-15', 29.50),
('ACAO', 'VALE3', 50, 62.10, '2023-03-22', 65.20),
('CRIPTO', 'BTC', 0.1, 150000.00, '2023-02-10', 165000.00),
('FUNDO', 'KNRI11', 10, 163.50, '2023-04-05', 165.00),
('RENDA_FIXA', 'TESOURO SELIC 2029', 2, 13750.00, '2023-01-20', 13800.00);