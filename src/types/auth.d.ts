
export interface User {
  id: number;
  username: string;
  email: string;
  name: string;
  lastname: string;
  document_type: number;
  document_number: string;
  phone: string;
  address: string;
  role: number;
  is_active?: boolean;
  image: File | string;
  role_auth: number
}


export interface UserDetail extends User {
  position_name: string;
  core_name: string;
  department_name: string;
}
export interface ClientData {
  count: number;
  next: string | null;
  previous: string | null;
  results: ClientDetail[];
}
export interface ClientDetail {
  id: number;
  name: string;
  lastname: string;
  document_type: number;
  document_number: string;
  birthdate : Date;
  email: string;
  gender: number;
  phone: string;
  address: string;
  postal_code: string;
  province: string;
  district: string;
  country: string;
  active?: boolean;
  image: File | string;
  created_at: string;
  role_auth: number;
}

export interface CategoriaDetail {
  [x: string]: any;
  products_related: number;
  id: number;
  name: string;
  color: number;
  description: string;
  type_category: number;
}

export interface PromotionDetail {
  [x: string]: any;
  id: number;
  name: string;
  description: string;
  discount: number;
  start_date: string;
  ending_date: string;
}