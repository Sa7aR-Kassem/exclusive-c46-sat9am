import { Product } from "./products.interface"

export interface CartResponse {
    status: boolean
    message: string
    numOfCartItems: number
    cartId: string
    data: CartDetails
}

export interface CartDetails {
    _id: string
    cartOwner: string
    products: ProductCart[]
    createdAt: string
    updatedAt: string
    __v: number
    totalCartPrice: number
}

export interface ProductCart {
    count: number
    _id: string
    product: Product
    price: number
}
