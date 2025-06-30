
export interface Category {
  id: string;
  name: string;
  description?: string;
  actual_fee: number;
  offer_fee: number;
  image_url?: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Panchayath {
  id: string;
  name: string;
  district: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Registration {
  id: string;
  customer_id: string;
  name: string;
  address: string;
  mobile: string;
  panchayath_id?: string;
  ward: string;
  agent_pro?: string;
  category_id?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface Admin {
  id: string;
  username: string;
  password_hash: string;
  role: 'super' | 'local' | 'user';
  name: string;
  is_active: boolean;
  created_at?: string;
  last_login?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  expiry_date: string;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}
