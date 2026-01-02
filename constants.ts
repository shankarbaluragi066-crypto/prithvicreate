
import { Service, Order, SiteSettings, AnalyticsData } from './types';

export const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Professional YouTube Video Editing - 4K High Quality',
    description: 'Transform your raw footage into a cinematic masterpiece. Perfect for tech reviewers, travel vloggers, and educational channels.',
    price: 49.99,
    revisions: 3,
    deliveryDays: 2,
    category: 'Video Editing',
    images: ['https://picsum.photos/seed/edit1/800/600'],
    features: ['Color Grading', 'Sound Design', 'Subtitles Included', 'Thumbnail Optimization'],
    status: 'published',
    impressions: 1240,
    clicks: 85
  },
  {
    id: '2',
    title: 'Custom Brand Identity & Minimalist Logo Design',
    description: 'A complete branding package for modern brand owners. Includes logo, color palette, and typography guide.',
    price: 150,
    revisions: 5,
    deliveryDays: 5,
    category: 'Graphic Design',
    images: ['https://picsum.photos/seed/logo1/800/600'],
    features: ['Source Files', 'High Resolution', 'Social Media Kit', '3D Mockup'],
    status: 'published',
    impressions: 890,
    clicks: 42
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-001',
    serviceId: '1',
    clientName: 'Alex Rivera',
    clientEmail: 'alex@youtube.com',
    status: 'active',
    totalAmount: 49.99,
    createdAt: '2024-05-15T10:00:00Z',
    details: 'Looking for a fast-paced edit for my latest tech review.'
  },
  {
    id: 'ORD-002',
    serviceId: '2',
    clientName: 'Sarah Jenkins',
    clientEmail: 'sarah@brand.co',
    status: 'completed',
    totalAmount: 150,
    createdAt: '2024-05-12T14:30:00Z',
    details: 'Need a logo that reflects sustainability and tech.'
  }
];

export const INITIAL_SETTINGS: SiteSettings = {
  name: 'Prithvi Creation',
  primaryColor: '#2563eb', // blue-600
  secondaryColor: '#4f46e5', // indigo-600
  logo: 'PC',
  socialLinks: {
    youtube: 'https://youtube.com',
    instagram: 'https://instagram.com'
  },
  seo: {
    metaTitle: 'Prithvi Creation - Premium Freelance Services',
    metaDescription: 'Expert video editing and branding services tailored for creators and modern brands.'
  }
};

export const MOCK_ANALYTICS: AnalyticsData[] = [
  { date: 'Mon', revenue: 400, orders: 4, visitors: 120 },
  { date: 'Tue', revenue: 300, orders: 3, visitors: 90 },
  { date: 'Wed', revenue: 600, orders: 6, visitors: 210 },
  { date: 'Thu', revenue: 450, orders: 5, visitors: 150 },
  { date: 'Fri', revenue: 800, orders: 8, visitors: 280 },
  { date: 'Sat', revenue: 1200, orders: 12, visitors: 450 },
  { date: 'Sun', revenue: 950, orders: 10, visitors: 390 },
];
