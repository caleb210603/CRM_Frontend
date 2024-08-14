export type Service = {
  id?: number;
  name: string;
  description: string;
  service_time: Date;
  maintenance?: boolean;
  rate: string;
  image: File | string;
  created_at?: Date; 
  updated_at?: Date; 
  promotion: number;
  category: number;
}