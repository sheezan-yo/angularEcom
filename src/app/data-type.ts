export interface signUp {
    name: string,
    email: string,
    password: string
}

export interface login {
    email: string,
    password: string
}

export interface product {
    name: string,
    price: number,
    category: string,
    description: string,
    image: string,
    id: string,
    quantity: number | undefined,
    productId: string | undefined,
}

export interface cart {
    name: string,
    price: number,
    category: string,
    description: string,
    image: string,
    id: number | undefined,
    quantity: number | undefined,
    userId: number,
    productId: string,
}

export interface priceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number
}

export interface order {
    email: string,
    address: string,
    contact: string,
    totalPrice: number,
    userId: number,
    id: number | undefined
}