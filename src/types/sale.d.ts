import { ClientDetail } from "./auth";
import { Product } from "./product";
import { Service } from "./service";
import { Phone } from 'lucide-react';

export interface Sale{
    items: any;
    saleID: number;
    cliente: string;
    name: string;
    lastname: string;
    email: string;
    phone: number;
    date: string;
    total: string;
    paymentType: number;
    saleStatus: number;
    customer: ClientDetail;
    created_at: string;
    updated_at: string;
}

export interface TableCellWithBadgeProps {
    saleStatus: number;
  }


export interface SaleDetail {
    sales: Sale
    serviceData: SaleDetailService | null;
    productData: SaleDetailProduct | null;
}

export interface SaleDetailProduct {
    id: number;
    quantity: number;
    unit_price: number;
    discount: number;
    tax: number;
    total_item_amount: number;
    created_at: string;
    sale_obj: Sale;
    product: Product;
}

export interface SaleDetailService {
    id: number;
    quantity: number;
    unit_price: number;
    discount: number;
    tax: number;
    total_item_amount: number;
    created_at: string;
    sale: Sale;
    service: Service;
}