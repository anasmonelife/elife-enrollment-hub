
import { Category, Panchayath, Registration, Admin, Announcement } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Pennyekart Free Registration',
    description: 'Totally free registration with free delivery between 2pm to 6pm. Basic level access to hybrid ecommerce platform.',
    actual_fee: 0,
    offer_fee: 0,
    is_active: true
  },
  {
    id: '2',
    name: 'Pennyekart Paid Registration',
    description: 'Premium registration with any time delivery between 8am to 7pm. Full access to hybrid ecommerce platform.',
    actual_fee: 500,
    offer_fee: 350,
    is_active: true
  },
  {
    id: '3',
    name: 'FarmeLife',
    description: 'Connected with dairy farm, poultry farm and agricultural ventures.',
    actual_fee: 750,
    offer_fee: 500,
    is_active: true
  },
  {
    id: '4',
    name: 'OrganeLife',
    description: 'Connected with vegetable and house gardening, especially terrace vegetable farming.',
    actual_fee: 600,
    offer_fee: 400,
    is_active: true
  },
  {
    id: '5',
    name: 'FoodeLife',
    description: 'Connected with food processing business and food-related enterprises.',
    actual_fee: 800,
    offer_fee: 600,
    is_active: true
  },
  {
    id: '6',
    name: 'EntreLife',
    description: 'Connected with skilled projects like stitching, art works, and various home services.',
    actual_fee: 650,
    offer_fee: 450,
    is_active: true
  },
  {
    id: '7',
    name: 'Job Card (Special)',
    description: 'Special offer card with fee cut packages, special offers, discounts. Investment card for getting points and profits. Convertible to any category.',
    actual_fee: 1200,
    offer_fee: 800,
    is_active: true
  }
];

export const panchayaths: Panchayath[] = [
  { id: '1', name: 'Amarambalam', district: 'Malappuram', is_active: true },
  { id: '2', name: 'Wandoor', district: 'Malappuram', is_active: true },
  { id: '3', name: 'Nilambur', district: 'Malappuram', is_active: true },
  { id: '4', name: 'Karulai', district: 'Malappuram', is_active: true }
];

export const registrations: Registration[] = [];

export const admins: Admin[] = [
  { id: '1', username: 'evaadmin', password_hash: 'eva919123', role: 'super', name: 'Super Admin', is_active: true },
  { id: '2', username: 'admin1', password_hash: 'elife9094', role: 'local', name: 'Local Admin', is_active: true },
  { id: '3', username: 'admin2', password_hash: 'penny9094', role: 'user', name: 'User Admin', is_active: true }
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Welcome to E-LIFE SOCIETY Registration',
    content: 'Register yourself for various self-employment opportunities through our hybrid ecommerce platform.',
    expiry_date: '2024-12-31',
    is_active: true,
    created_at: new Date().toISOString()
  }
];
