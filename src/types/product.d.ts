export type Product = {
  id?: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  stock_security?: number;
  barcode?: string;
  status?: ProductStatusEnums;
  created_at?: Date;
  updated_at?: Date;
  category: number;
  image: File | string;
  brand: string;
  rating:string;

};


export enum ProductStatusEnums{
  disponible = 0,
  agotado = 1,
  descatalogado = 2
}