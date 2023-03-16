import express, { query, Request, Response} from "express";
import cors from "cors";
import { users, products, purchases, createUser, getAllUsers, createProduct, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { ECategory, TProduct, TUser, TPurchase } from "./types";

//console.log("Opaaaaaa!!!");
// console.log(users);
// console.log(products);
// console.log(purchases);

//teste de funções exercícios typescrip ii
// createUser("u003", "tibas@gmail.com", "Tiberio");
// getAllUsers();
//createProduct("p003", "Monitor HD", 800, ECategory.ELECTRONICS);
//console.log(getProductById("p001"));
// console.table(products);
//console.table(queryProductsByName("play"));
//createPurchase("u001", "p001", 1, 500);
//console.log(getAllPurchasesFromUserId("u002"));

//Exercícios express e cors
const app = express();
app.use(express.json());
app.use(cors());
app.listen(3003, () => {
    console.log("Servido rodando na porta 3003");
});
app.get("/ping", (req: Request, res:Response) => {
    res.send("Pong!");
});

//getAllUsers - buscar todos os usuários
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users);
});

//getAllProduct - buscar todos os produtos
app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products);
});

//searchProductByName - buscar produtos por nome
app.get("/products/search", (req:Request, res: Response) => {
    const q = req.query.q as string;
    const result : TProduct[] = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase())); 
    res.status(200).send(result);
});

//createUser - criar usuário
app.post("/users", (req: Request, res: Response) => {
    const { id, name, email, password } : TUser = req.body;
    const newUser : TUser = {
        id, 
        name,
        email,
        password
    };
    users.push(newUser);
    res.status(201).send("Cadrastro realizado com sucesso!");
});

//createProduct - criar produto
app.post("/products", (req: Request, res: Response) => {
    const {id, name, price, category} : TProduct = req.body;
    const newProduct : TProduct = {
        id,
        name,
        price,
        category
    };
    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso!");
});

//createPurchase - criar compra
app.post("/puchases", (req: Request, res: Response) => {
    const {userId, productId, quantity, totalPrice} : TPurchase = req.body;
    const newPurchase : TPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    };
    purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso!");
});