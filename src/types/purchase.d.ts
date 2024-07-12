// export interface Purchase {
//     id: number;
//     provider_id: number;
//     date_purchase: Date;
//     number_bill: string;
//     total: number;
//     estatus: string;
//     // status: string;
//     created_at?: Date;
//     updated_at?: Date;
//     details?: PurchaseDetail[];
//     provider?: Provider;
//     payments?: Payment[];
// };

export interface Purchase {
    id: number;
    provider_id: number;
    date_purchase: Date;
    number_bill: string;
    total: number;
    estatus: string;
    // status: string;
    created_at?: Date;
    updated_at?: Date;
    details?: PurchaseDetail[];
    provider?: Provider;
    payments?: Payment[];
    description?: string; 
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
    created_at: Date; 
    purchase_obj: { 
        id: number,
        description : string,
    };
}



export interface Provider {
    id: number;
    person_contact: string;
    phone: string;
    email: string;
    address: string;
    notes: string;
    created_at: Date;
    updated_at: Date;
}

export interface Payment {
    id: number;
    purchase_id: number;
    date_payment: Date;
    date_limit: Date;
    payment_method: string;
    total: number;
    cancelled_total: number;
    status: string;
}

export interface Item {
    name: string;
    description: string;
    quantity: number;
    price: number;
    total: number;
}