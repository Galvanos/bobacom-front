import { ingrediente } from "./ingrediente.model";

interface composizione {
  id: number;
  idProdotto: number;
  ingrediente: ingrediente;
  quantita: number;
}

export interface CartItem {
    name: string,
    productId: number,
    price: number,
    quantity: number,
    composizione: composizione[]
}