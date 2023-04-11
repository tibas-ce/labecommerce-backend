-- Active: 1680041881622@@127.0.0.1@3306

-- criando tabela de usuários
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL
);

-- criando tabela  de produtos
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL
);

-- criando tabela purchases
CREATE TABLE purchases (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT(DATETIME()) NOT NULL,
    delivered_at TEXT,
    buyer_id TEXT NOT NULL,
    FOREIGN KEY(buyer_id) REFERENCES users(id)
);


-- Criando tabela de relações
CREATE TABLE purchases_products (
    purchase_id TEXT NOT NULL,
    product_id TEXT NOT NULL,
    quantity INTEGER DEFAULT(1) NOT NULL,
    FOREIGN KEY (purchase_id) REFERENCES purchases(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);


-- populando tabela users
INSERT INTO users (id, name, email, password) VALUES 
("u001", "fulano", "fulanof@email.com", "010203"),
("u002", "fulana", "fulana@email.com", "040506"),
("u003", "cicrano", "cicrano@email.com", "589624");

-- populando tabela products
INSERT INTO products (id, name, price, category, description, image_url) 
VALUES
("p001", "Playstation 5", 4000, "Eletrônicos", "especificações", "imagem"),
("p002", "Suporte de mesa", 130, "Acessorios", "especificações", "imagem"),
("p003", "Tênis Adidas", 220, "Roupas e calçados", "especificações", "imagem"),
("p004", "Monitor HD", 800, "Eletrônicos", "especificações", "imagem"),
("p005", "Suporte TV", 50, "Acessorios", "especificações", "imagem");

-- populando tabela purchases
INSERT INTO purchases (id, total_price, paid, buyer_id) VALUES
("pu001", 4000, 0, "u001"),
("pu002", 3500, 0, "u002"),
("pu003", 850, 0, "u002"),
("pu004", 220, 0, "u001");

INSERT INTO purchases_products VALUES
("pu001", "p001", 1),
("pu002", "p002", 1),
("pu002", "p003", 1),
("pu003", "p004", 2),
("pu003", "p005", 1),
("pu004", "p003", 1);

-- deletando tabelas
-- só trocar o valor para a tabela que deseja apagar
DROP TABLE purchases_products;


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
("u004", "cicrana", "cicrana@email.com", "192358");

-- createProducts (criar produtos)
INSERT INTO products (id, name, price, category, description, image_url)
VALUES
("p006", "Bota Adventure", 159, "Roupas e calçados","especificações", "imagem");

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
WHERE id = "u003";

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

-- query de consulta: junção INNER JOIN
-- todas as colunas das tabelas relacionadas
SELECT * FROM purchases_products
INNER JOIN purchases
ON purchases.id = purchases_products.purchase_id
INNER JOIN products
ON products.id = purchases_products.product_id;

-- query de consulta: com valores especificos
SELECT 
products.name ,purchases_products.quantity, purchases.total_price,
products.price, purchases.id  
FROM purchases_products
INNER JOIN purchases
ON purchases.id = purchases_products.purchase_id
INNER JOIN products
ON products.id = purchases_products.product_id;