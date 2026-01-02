
export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'visitor';
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  revisions: number;
  deliveryDays: number;
  category: string;
  images: string[];
  videos?: string[];
  pdfs?: string[];
  features: string[];
  status: 'published' | 'draft';
  impressions: number;
  clicks: number;
}

export interface Order {
  id: string;
  serviceId: string;
  clientName: string;
  clientEmail: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  totalAmount: number;
  createdAt: string;
  details: string;
}

export interface SiteSettings {
  name: string;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  socialLinks: {
    youtube?: string;
    instagram?: string;
    twitter?: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
}

export interface AnalyticsData {
  date: string;
  revenue: number;
  orders: number;
  visitors: number;
}
