export interface Purchase {
    [x: string]: any;

    id: number;
    provider_id: number;
    date_purchase: Date;
    number_bill: string;
    total: number;
    estatus: string;
    created_at?: Date;
    updated_at?: Date;
    details?: PurchaseDetail[];
    provider?: Provider;
    payments?: Payment[];
    description?: string; 
    payment?: Payment;
    provider_obj?: { 
        id: number;
        name: string;
        ruc: number;
    };
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
    purchase_obj: Purchase;
    created_at: Date; 
    purchase_obj: { 
        id: number,
        description : string,
    };
}


export interface Provider {
    value: string;
    id: number;
    name: string;
    estatus: string;

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
    purchase_obj: Purchase;
    description_obj: string;
    cancelled_total: number;
    estatus: string;
    estatus: string;
}
