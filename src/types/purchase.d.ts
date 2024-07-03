export interface Purchase {
  id?: number;
  description: string;
  provider_id: number;
  date_purchase: Date;
  number_bill: string;
  total: number;
  status: string;
  created_at?: Date;
  updated_at?: Date;
  details?: PurchaseDetail[];
  provider?: Provider;
  payment?: Payment;
}

export interface PurchaseDetail {
    id : number;
    purchase_id: number;
    date_purchase : Date;
    item: string;
    price: number;
    quantity: number;
    total: number;
    description: string;
    created_at: Date; 
}

export interface Provider {
    value: string;
    id: number;
    name: string;
    ruc: number;
    person_contact: string;
    phone: string;
    email: string;
    address: string;
    note: string;
    created_at: Date;
    updated_at: Date;
}

export interface Payment {
    id: number;
    date_payment: Date;
    date_limit: string;
    payment_method: string;
    total: number;
    cancelled_total: number;
    status: string;
}
