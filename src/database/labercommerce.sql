-- Active: 1680041881622@@127.0.0.1@3306

-- criando tabela de usuários
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- populando tabela users
INSERT INTO users (id, name, email, password) VALUES ("u001", "Gandalf O Branco", "gandalf@email.com", "010203"),
("u002", "Ozzy Osbourn", "ozzy@email.com", "040506"),
("u003", "Joel Miller", "joel@email.com", "589624");

-- criando tabela  de produtos
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL
);

-- populando tabela products
INSERT INTO products (id, name, price, category) 
VALUES
("p001", "Playstation 5", 4000, "Eletrônicos"),
("p002", "Suporte de mesa", 130, "Acessorios"),
("p003", "Tênis Adidas", 220, "Roupas e calçados"),
("p004", "Monitor HD", 800, "Eletrônicos"),
("p005", "Suporte TV", 50, "Acessorios");

-- criando tabela purchases
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY(buyer_id) REFERENCES users(id)
);

-- populando tabela purchases
INSERT INTO purchases (id, total_price, paid, buyer_id) VALUES
("pu001", 1500, 0, "u001"),
("pu002", 100, 0, "u002"),
("pu003", 500, 0, "u002"),
("pu004", 100, 0, "u001");

-- deletando tabelas
-- users
DROP TABLE users;
-- products
DROP TABLE products;

-- getAllUsers (retorna todos os usuários)
SELECT * FROM users;

-- retorna o resultado ordenado pela coluna email em ordem crescente
SELECT * FROM users
ORDER BY "email" DESC;

-- getAllProducts (retorna todo os produtos)
SELECT * FROM products;

-- getAllProducts - 1
-- retorna o resultado ordenado pela coluna price em ordem crescente
-- limite o resultado em 20 iniciando pelo primeiro item
SELECT * FROM products
ORDER BY "price" DESC
LIMIT 20 OFFSET 0;

-- getAllProducts - 2
-- mocke um intervalo de preços, por exemplo entre 100.00 e 300.00
-- retorna os produtos com preços dentro do intervalo mockado em ordem crescente
SELECT * FROM products
WHERE price >= 1000 AND price <= 3000;

-- searchProductsByName (busca de produtos por nome) 
SELECT * FROM products
WHERE name LIKE "Mon%";

-- createUser (criar usuário)
INSERT INTO users (id, name, email, password)
VALUES
("u004", "Virgulino Lampião", "lampiao@email.com", "192358");

-- createProducts (criar produtos)
INSERT INTO products (id, name, price, category)
VALUES
("p006", "Bota Adventure", 159, "Roupas e calçados");

-- getProductsById (busca de produtos por id)
SELECT * FROM products
WHERE id LIKE "p001";

-- deleteProductById (deletando produto por id)
DELETE FROM users
WHERE id = "u004";

-- deleteUserById (deletando usuário por id)
DELETE FROM products
WHERE id = "p006";

-- editUserById (editando usuário por id)
UPDATE users
SET 
    name = "Fulano",
    email = "fulano@email.com",
    password = "f15a62"
WHERE id = "u001";

-- editProductById (editando produto poor id)
UPDATE products
SET 
    name = "Smart-TV",
    price = 2199,
    category = "Eletrônicos"
WHERE id = "p002";    

-- Edite o status da data de entrega de um pedido
UPDATE purchases
SET 
    delivered_at = datetime("now")
WHERE id = "pu001";

-- query de consulta: histórico de compras
SELECT purchases.buyer_id AS HistoricoCompras, purchases.total_price, purchases.delivered_at FROM purchases
INNER JOIN users
ON users.id = buyer_id
WHERE buyer_id = "u001";