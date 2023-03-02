export type tUser = {
    id: string,
    email: string,
    password: string
};

export type tProduct = {
    id: string,
    name: string,
    price: number,
    category: string
};

export type tPurchase = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
};