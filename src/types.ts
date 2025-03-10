export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: string;
  brand: string;
  size: string[];
  color: string[];
}

export interface CartItem extends Product {
  quantity: number;
}