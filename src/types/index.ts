
export interface Category {
  id: string;
  name: string;
  description: string;
  actualFee: number;
  offerFee: number;
  image?: string;
  isActive: boolean;
}

export interface Panchayath {
  id: string;
  name: string;
  district: string;
  isActive: boolean;
}

export interface Registration {
  id: string;
  customerId: string;
  name: string;
  address: string;
  mobile: string;
  panchayathId: string;
  ward: string;
  agentPro: string;
  categoryId: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
  role: 'super' | 'local' | 'user';
  name: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  expiryDate: Date;
  isActive: boolean;
  createdAt: Date;
}
