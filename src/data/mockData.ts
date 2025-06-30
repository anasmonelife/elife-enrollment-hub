
import { Category, Panchayath, Registration, Admin, Announcement } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Pennyekart Free Registration',
    description: 'Totally free registration with free delivery between 2pm to 6pm. Basic level access to hybrid ecommerce platform.',
    actualFee: 0,
    offerFee: 0,
    isActive: true
  },
  {
    id: '2',
    name: 'Pennyekart Paid Registration',
    description: 'Premium registration with any time delivery between 8am to 7pm. Full access to hybrid ecommerce platform.',
    actualFee: 500,
    offerFee: 350,
    isActive: true
  },
  {
    id: '3',
    name: 'FarmeLife',
    description: 'Connected with dairy farm, poultry farm and agricultural ventures.',
    actualFee: 750,
    offerFee: 500,
    isActive: true
  },
  {
    id: '4',
    name: 'OrganeLife',
    description: 'Connected with vegetable and house gardening, especially terrace vegetable farming.',
    actualFee: 600,
    offerFee: 400,
    isActive: true
  },
  {
    id: '5',
    name: 'FoodeLife',
    description: 'Connected with food processing business and food-related enterprises.',
    actualFee: 800,
    offerFee: 600,
    isActive: true
  },
  {
    id: '6',
    name: 'EntreLife',
    description: 'Connected with skilled projects like stitching, art works, and various home services.',
    actualFee: 650,
    offerFee: 450,
    isActive: true
  },
  {
    id: '7',
    name: 'Job Card (Special)',
    description: 'Special offer card with fee cut packages, special offers, discounts. Investment card for getting points and profits. Convertible to any category.',
    actualFee: 1200,
    offerFee: 800,
    isActive: true
  }
];

export const panchayaths: Panchayath[] = [
  { id: '1', name: 'Amarambalam', district: 'Malappuram', isActive: true },
  { id: '2', name: 'Wandoor', district: 'Malappuram', isActive: true },
  { id: '3', name: 'Nilambur', district: 'Malappuram', isActive: true },
  { id: '4', name: 'Karulai', district: 'Malappuram', isActive: true }
];

export const registrations: Registration[] = [];

export const admins: Admin[] = [
  { id: '1', username: 'evaadmin', password: 'eva919123', role: 'super', name: 'Super Admin' },
  { id: '2', username: 'admin1', password: 'elife9094', role: 'local', name: 'Local Admin' },
  { id: '3', username: 'admin2', password: 'penny9094', role: 'user', name: 'User Admin' }
];

export const announcements: Announcement[] = [
  {
    id: '1',
    title: 'Welcome to E-LIFE SOCIETY Registration',
    content: 'Register yourself for various self-employment opportunities through our hybrid ecommerce platform.',
    expiryDate: new Date('2024-12-31'),
    isActive: true,
    createdAt: new Date()
  }
];
