import { composizione } from "./composizione.model";

export interface CartItem {
    name: string,
    productId: number,
    price: number,
    quantity: number,
    composizione: composizione[]
}