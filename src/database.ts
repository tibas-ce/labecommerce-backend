import { tUser, tProduct, tPurchase } from "./types";


//para a tipagem em arrays podemos usar duas formas Array<type> ou type[]
export const users:  Array<tUser> = [
    {
        id: "joão1",
        email: "joao@email.com",
        password: "123456"
    }, 
    {
        id: "maria1",
        email: "maria@email.com",
        password: "654123"
    }
];

export const products: tProduct[] = [
    {
        id: "001",
        name: "chapel de couro",
        price: 50,
        category: "chapeus"
    },
    {
        id: "002",
        name: "Camisa manga longa",
        price: 75,
        category: "camisas"
    }
];

export const purchases: tPurchase[] = [
    {
        userId: "joao1",
        productId: "001",
        quantity: 2,
        totalPrice: 100
    },
    {
        userId: "maria1",
        productId: "002",
        quantity: 3,
        totalPrice: 225
    }
];