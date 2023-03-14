import { users, products, purchases, createUser, getAllUsers, createProduct, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database";
import { ECategory } from "./types";

//console.log("Opaaaaaa!!!");
// console.log(users);
// console.log(products);
// console.log(purchases);

//teste de funções
// createUser("u003", "tibas@gmail.com", "Tiberio");
// getAllUsers();
//createProduct("p003", "Monitor HD", 800, ECategory.ELECTRONICS);
console.log(getProductById("p001"));
// console.table(products);
//console.table(queryProductsByName("play"));
//createPurchase("u001", "p001", 1, 500);
console.log(getAllPurchasesFromUserId("u002"));
