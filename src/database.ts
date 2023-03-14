import { TUser, TProduct, TPurchase, ECategory } from "./types";


//para a tipagem em arrays podemos usar duas formas Array<type> ou type[]
//Usuários
export const users:  Array<TUser> = [
    {
        id: "u001",
        name: "João",
        email: "joao@email.com",
        password: "123456",
    }, 
    {
        id: "u002",
        name: "maria",
        email: "maria@email.com",
        password: "654123",
    }
];

//criar usuário
export const createUser = (id: string, email:string, password: string) : void => {
    const newUser : TUser = {id, email, password};
    users.push(newUser);
    return (
        console.log("Cadastro realizado com sucesso.")
    );
};

//buscar todos os usuários
export const getAllUsers = () : void => {
    return(
        console.table(users)
    );
};

//Produtos
export const products: TProduct[] = [
    {
        id: "p001",
        name: "Playstation",
        price: 500,
        category: ECategory.ELECTRONICS
    },
    {
        id: "p002",
        name: "Camisa",
        price: 75,
        category: ECategory.CLOTHES_AND_SHOES
    }
];

//criar novo produto
export const createProduct = (id: string, name: string, price: number, category: ECategory) : void => {
    const newProduct : TProduct = {id, name, price, category};
    products.push(newProduct);
    return (
        console.log("Produto criado com sucesso.")
    );
};

//buscar todos os produtos
export const getAllProducts = () : void => {
    return(
        console.table(products)
    );
};

//busca por id do produto
export const getProductById = (id: string) : void => {
    products.find((produto) => {
        if (produto.id === id){
            return (
                console.table(produto)
            );
        };
    });
};

//busca produtos baseado em um nome da lista
export const queryProductsByName = (q: string) : TProduct[] => {
    return products.filter((prods) => prods.name.toLowerCase().includes(q.toLowerCase()))
};

//Compras
export const purchases: TPurchase[] = [
    {
        userId: "u001",
        productId: "p001",
        quantity: 2,
        totalPrice: 1000
    },
    {
        userId: "u002",
        productId: "p002",
        quantity: 3,
        totalPrice: 225
    }
];

//criar compra
export const createPurchase = (userId: string, productId: string, quantity: number, totalPrice:number) : void => {
    const newPurchase : TPurchase = {userId, productId, quantity, totalPrice};
    purchases.push(newPurchase);
    return (
        console.log("Compra realizada com sucesso.")
    );
};

//buscar compra pelo feitas por determinado usuário
export const getAllPurchasesFromUserId = (userIdToSearch: string) : void => {
    purchases.find((purchase) => {
        if (purchase.userId === userIdToSearch){
            return (
                console.table(purchase)
            );
        };
    });
};
