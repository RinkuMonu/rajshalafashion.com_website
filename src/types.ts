// Product type definitions
export interface Product {
  id: string;
  _id?: string;
  name?: string;
  productName?: string;
  price: number;
  actualPrice?: number;
  image: string;
  images?: string[] | string;
  description?: string;
  category?: string | {
    name: string;
  };
  quantity?: number;
  discount?: number;
  rating?: number;
  reviewCount?: number;
  stock?: number;
  size?: string[] | any[];
}
