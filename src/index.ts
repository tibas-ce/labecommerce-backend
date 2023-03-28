import express, { Request, Response} from "express";
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
//refatorando para uso de try/catch (exercícios - fluxo de dados)
app.get("/users", (req: Request, res: Response) => {
    try{
        res.status(200).send(users);
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };        
    };
});

//getAllProduct - buscar todos os produtos
//refatorando para uso de try/catch
app.get("/products", (req: Request, res: Response) => {
    try{
        res.status(200).send(products);    
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };    
});

//searchProductByName - buscar produtos por nome
//refatorando para uso de try/catch (exercícios - fluxo de dados)
app.get("/products/search", (req:Request, res: Response) => {
    try{
        const q = req.query.q;
        if(typeof q !== "string"){
            res.status(400);
            throw new Error("'q' deve ser uma 'string'.");
        };
        if(q.length < 1){
            res.status(400);
            throw new Error("'q' deve conter no minimo 1 caractere.");
        };
        const result : TProduct[] = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase()));
        res.status(200).send(result);
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };
    
});

//createUser - criar usuário
//refatorando para uso de try/catch (exercícios - fluxo de dados)
app.post("/users", (req: Request, res: Response) => {
    try{
        const { id, name, email, password } : TUser = req.body;
        //validando o body com if
        if(typeof id !== "string"){
            res.status(400);
            throw new Error("'id' precisa ser preenchido.");
        };
        if(!id){
            res.status(400);
            throw new Error("'id' precisa ser uma 'string'.");
        };
        if(typeof name !== "string"){
            res.status(400);
            throw new Error("'nome' precisa ser preenchido.");
        };
        if(!name){
            res.status(400);
            throw new Error("'nome' precisa ser uma 'string'.");
        };
        if(typeof email !== "string"){
            res.status(400);
            throw new Error("'email' precisa ser preenchido.");
        };
        if(!email){
            res.status(400);
            throw new Error("'email' precisa ser uma 'string'.");
        };
        if(typeof password !== "string"){
            res.status(400);
            throw new Error("'password' precisa ser preenchido.");
        };
        if(!password){
            res.status(400);
            throw new Error("'password' precisa ser uma 'string'.");
        };
        const newUser : TUser = {
            id, 
            name,
            email,
            password
        };
        //validação de id já cadastrado
        const usersIdExists = users.find((user) => user.id === id);
        if(usersIdExists){
            res.status(400);
            throw new Error("'id' já cadastrado");
        };
        //validação de email já existente
        const usersEmailExists = users.find((user) => user.email === email);
        if(usersEmailExists){
            res.status(400);
            throw new Error("'email' já cadastrado");
        };
        users.push(newUser);
        res.status(201).send("Cadrastro realizado com sucesso!");
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };
});

//createProduct - criar produto
//refatorando para uso de try/catch (exercícios - fluxo de dados)
app.post("/products", (req: Request, res: Response) => {
    try{
        const {id, name, price, category} : TProduct = req.body;
        //validação do body
        if(typeof id !== "string"){
            res.status(400);
            throw new Error("'id' precisa ser preenchido.");
        };
        if(!id){
            res.status(400);
            throw new Error("'id' precisa ser uma 'string'.");
        };
        if(typeof name !== "string"){
            res.status(400);
            throw new Error("'nome' precisa ser preenchido.");
        };
        if(!name){
            res.status(400);
            throw new Error("'nome' precisa ser uma 'string'.");
        };
        if(typeof price !== "number"){
            res.status(400);
            throw new Error("'price' precisa ser preenchido.");
        };
        if(!price){
            res.status(400);
            throw new Error("'price' precisa ser uma 'number'.");
        };
        if(typeof category !== "string"){
            res.status(400);
            throw new Error("'category' precisa ser preenchido com uma das opções: 'Acessorios', 'Roupas' ou 'Eletrônicos' .");
        };
        if(!category){
            res.status(400);
            throw new Error("'category' precisa ser uma 'string'.");
        };
        const newProduct : TProduct = {
            id,
            name,
            price,
            category
        };
        //validação de produto existente
        const productIdExists = products.find((product) => product.id === id);
        if(productIdExists){
            res.status(400);
            throw new Error("'id' já cadastrado.");
       };
       products.push(newProduct);
       res.status(201).send("Produto cadastrado com sucesso!");
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };
});

//createPurchase - criar compra
//refatorando para uso de try/catch (exercícios - fluxo de dados)
app.post("/purchases", (req: Request, res: Response) => {
    try {
        const {userId, productId, quantity, totalPrice} : TPurchase = req.body;
        if(!userId){
            res.status(400);
            throw new Error("'userId' precisa ser uma 'string'.");
        };
        if(userId !== undefined){
            if(typeof userId !== "string"){
                res.status(400);
                throw new Error("'userId' precisa ser preenchido.");
            };
        }
        if(!productId){
            res.status(400);
            throw new Error("'productId' precisa ser uma 'string'.");
        };
        if(productId !== undefined){
            if(typeof productId !== "string"){
                res.status(400);
                throw new Error("'productId' precisa ser preenchido.");
            };
        }
        if(!quantity){
            res.status(400);
            throw new Error("'quantity' precisa ser uma 'number'.");
        };
        if(quantity !== undefined){
            if(typeof quantity !== "number"){
                res.status(400);
                throw new Error("'quantity' precisa ser preenchido.");
            };
        }
        if(!totalPrice){
            res.status(400);
            throw new Error("'totalPrice' precisa ser uma 'number'.");
        };
        if(totalPrice !== undefined){
            if(typeof totalPrice !== "number"){
                res.status(400);
                throw new Error("'totalPrice' precisa ser preenchido.");
            };
        }
        const newPurchase : TPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        };
        const usersIdExists = users.find((user) => user.id === userId);
        if(!usersIdExists){
            res.status(400);
            throw new Error("'id' de usuário não encontrado.");
        };
        const productIdExists = products.find((product) => product.id === productId);
        if(!productIdExists){
            res.status(400);
            throw new Error("'id' do produto não encontrado.");
        };
        purchases.push(newPurchase);
        res.status(201).send("Compra realizada com sucesso!");
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };
    
});

//exercícios aprofundamento express

//getProductsById - buscar produtos por id
//refatorando para uso de try/catch (exercícios - fluxo de dados)
app.get("/products/:id", (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        //validando id
        if(typeof id !== "string"){
            res.status(400);
            throw new Error("'id' precisa ser preenchido.");
        };
        if(!id){
            res.status(400);
            throw new Error("'id' precisa ser uma 'string'.");
        };
        const result : TProduct | undefined = products.find(product => product.id === id);
        if(!result){
            res.status(400);
            throw new Error("Produto não encontrado, verifique o 'id'.")
        }
        res.status(200).send(result); 
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };
    
});

//getUserPurchasesById - buscar compras através do id do usuário
//refatorando para uso de try/catch (exercícios - fluxo de dados)
app.get("/purchases/:id", (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        if(typeof id !== "string"){
            res.status(400);
            throw new Error("'id' precisa ser preenchido.");
        };
        if(!id){
            res.status(400);
            throw new Error("'id' precisa ser uma 'string'.");
        };
        const result : TPurchase | undefined = purchases.find(purchase => purchase.userId === id);
        if(!result){
            res.status(400);
            throw new Error("Usuário não encontrado, verifique o 'id'.")
        }
        res.status(200).send(result);
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };
});

//editUserById - editar usuário
//refatorando para uso de try/catch (exercícios - fluxo de dados) 
app.put("/users/:id", (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        const newName = req.body.name;
        const newEmail = req.body.email;
        const newPassword = req.body.password;
        //validando o body
        if(typeof id !== "string"){
        res.status(400);
        throw new Error("'id' precisa ser preenchido.");
        };
        if(!id){
        res.status(400);
        throw new Error("'id' precisa ser uma 'string'.");
        };
        if(typeof newName !== "string"){
        res.status(400);
        throw new Error("'newName' precisa ser preenchido.");
        };
        if(!newName){
        res.status(400);
        throw new Error("'newName' precisa ser uma 'string'.");
        };
        if(typeof newEmail !== "string"){
        res.status(400);
        throw new Error("'newEmail' precisa ser preenchido.");
        };
        if(!newEmail){
        res.status(400);
        throw new Error("'newEmail' precisa ser uma 'string'.");
        };
        if(typeof newPassword !== "string"){
        res.status(400);
        throw new Error("'newPassword' precisa ser preenchido com uma 'string'.");
        };
        if(!newPassword){
        res.status(400);
        throw new Error("'newPassword' precisa ser uma 'string'.");
        };
        //validar que o usuário existe
        const usersIdExists = users.find((user) => user.id === id);
        if(usersIdExists){
            //criando usuário
        const findUser : TUser | undefined = users.find(user => user.id === id);
        if(findUser){
            findUser.name = newName || findUser.name;
            findUser.email = newEmail || findUser.email;
            findUser.password = newPassword || findUser.password;
        };
        res.status(200).send("Cadastro atualizado com sucesso!");    
        } else {
            res.status(400);
            throw new Error("Usuário não encontrado, verifique 'id'.");
        };
        
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };
    
});

//editProductById - editar produto
//refatorando para uso de try/catch (exercícios - fluxo de dados) 
app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id : string = req.params.id;
        const newName : string | undefined = req.body.name;
        const newPrice : number | 0 = req.body.price;
        const newCategory : ECategory | undefined = req.body.category;
        //validando o body
        if(typeof id !== "string"){
            res.status(400)
            throw new Error("'id' precisa ser preenchido.")
        }
        if(!id){
            res.status(400)
            throw new Error("'id' precisa ser uma 'string'.")
        }
        if (typeof newName !== "string"){
            res.status(400)
            throw new Error("'newName' precisa ser preenchido.")
        }
        if(!newName){
            res.status(400)
            throw new Error("'newName' precisa ser uma 'string'.")
        }
        if(typeof newPrice !== "number"){
            res.status(400)
            throw new Error("'newPrice' precisa ser preenchido.")
        }
        if(!newPrice){
            res.status(400)
            throw new Error("'newPrice' precisa ser uma 'number'.")
        }
        if(typeof newCategory !== "string"){
            res.status(400)
            throw new Error("'newCategory' precisa ser preenchido com uma das opções: 'Acessorios', 'Roupas' ou 'Eletrônicos' .")
        }
        if(!newCategory){
            res.status(400)
            throw new Error("'newCategory' precisa ser uma 'string'.")
        }
        //validação de produto existente
        const productIdExists = products.find((product) => product.id === id);
        if(productIdExists){
            //atualizando produto
        const findProduct : TProduct | undefined = products.find(product => product.id === id);
        if(findProduct){
            findProduct.name = newName || findProduct.name;
            findProduct.price = isNaN(newPrice) ? findProduct.price : newPrice;
            findProduct.category = newCategory || findProduct.category;
        };
        res.status(200).send("Produto atualizado com sucesso!");    
        } else {
            res.status(400);
            throw new Error("Produto encontrado.");
        }
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };
    
});

//deleteUserById - deletando usuário por id
//refatorando para uso de try/catch (exercícios - fluxo de dados)
app.delete("/users/:id", (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        //validando id
        if(typeof id !== "string"){
            res.status(400);
            throw new Error("'id' precisa ser preenchido.");
        };
        if(!id){
            res.status(400);
            throw new Error("'id' precisa ser uma 'string'.");
        };
        //validando se id começa com 'u'
        if(id[0] !== "u"){
            res.status(400);
            throw new Error("'id' inválido. Deve iniciar com a letra 'u'.");
        };
        //validação usuário não existente
        const usersIdExists = users.find((user) => user.id === id);
        if(!usersIdExists){
            res.status(400);
            throw new Error("Usuário não encontrado verifique o 'id'.");
        };
        const index = users.findIndex(user => user.id === id);
        if(index >= 0){
            users.splice(index, 1);
        };
        res.status(200).send("Usuário apagado com sucesso!");
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };
    
});

//deleteProductById - deletando produto por id
//refatorando para uso de try/catch (exercícios - fluxo de dados)
app.delete("/products/:id", (req: Request, res: Response) => {
    try{
        const id = req.params.id;
        //validando id
        if(typeof id !== "string"){
            res.status(400);
            throw new Error("'id' precisa ser preenchido.");
        };
        if(!id){
            res.status(400);
            throw new Error("'id' precisa ser uma 'string'.");
        };
        //validando se id começa com 'p'
        if(id[0] !== "p"){
            res.status(400);
            throw new Error("'id' inválido. Deve iniciar com a letra 'p'.");
        };
        //validação produto não existente
        const productsIdExists = products.find((product) => product.id === id);
        if(!productsIdExists){
            res.status(400);
            throw new Error("Usuário não encontrado verifique o 'id'.")
        }
        const index = products.findIndex(product => product.id === id);
        if(index >= 0){
            products.splice(index, 1);
        };
        res.status(200).send("Produto apagado com sucesso!");
    } catch(error){
        console.log(error);
        if(res.statusCode === 200){
            res.status(500);
        };
        if(error instanceof Error){
            res.send(error.message);
        } else {
            res.send("Erro inesperado!");
        };
    };
    
});