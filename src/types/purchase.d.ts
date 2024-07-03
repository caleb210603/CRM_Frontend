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
  id: number;
  purchase_id: number;
  date_purchase: Date;
  item: Item[];
  price: number;
  quantity: number;
  total: number;
  created_at: Date;
}

export interface Provider {
  id: number;
  name: string;
  ruc: string;
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
    date_limit: Date;
    payment_method: string;
    total: number;
    cancelled_total: number;
    estatus: string;
    purchase_obj: Purchase;
    description_obj: string;
}

export interface Item {
  id: number;
  item: string;
  description: string;
  quantity: number;
  price: string;
  total: string;
  purchase_obj: Purchase;
}
