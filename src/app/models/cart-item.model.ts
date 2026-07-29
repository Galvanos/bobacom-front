import { composizione } from "./composizione.model";

export interface CartItem {
    name: string,
    price: number,
    quantity: number,
    composizione: composizione[]
}