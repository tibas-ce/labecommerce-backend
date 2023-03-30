
-- tabela de usuários
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

-- populando tabela users
INSERT INTO users (id, email, password) VALUES ("u001", "gandalf@email.com", "010203"),
("u002", "ozzy@email.com", "040506"),
("u003", "joel@email.com", "589624");

-- tabela  de produtos
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