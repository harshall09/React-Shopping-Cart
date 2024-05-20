export interface Product {
    _id: string; 
    id:number;
    name:string;
    description:string;
    price:number;
    image:string;

}
export interface CartItem extends Product {
    quantity: number;
  }