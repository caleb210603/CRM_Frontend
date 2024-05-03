import { ClientDetail } from "./auth";
import { Product } from "./product";
import { Service } from "./service";

export interface Sale{
    items: any;
    saleID: number;
    date: string;
    total: string;
    paymentType: number;
    customer: ClientDetail;
    created_at: string;
    updated_at: string;
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
    product_obj: Product;
}

export interface SaleDetailService {
    id: number;
    quantity: number;
    unit_price: number;
    discount: number;
    tax: number;
    total_item_amount: number;
    created_at: string;
    sale_date: Sale;
    service: Service;
}