// User Types
export type UserRole = 'customer' | 'worker' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
}

export interface Customer extends User {
  role: 'customer';
  address?: string;
  favoriteWorkers: string[];
}

export interface Worker extends User {
  role: 'worker';
  category: WorkerCategory;
  bio: string;
  experience: number;
  rating: number;
  reviewCount: number;
  jobsCompleted: number;
  priceRange: { min: number; max: number };
  specialties: string[];
  availableToday: boolean;
  verified: VerificationStatus;
  portfolio: string[];
  services: Service[];
  availability: Availability;
  location: string;
  memberSince: string;
}

export interface Admin extends User {
  role: 'admin';
  permissions: string[];
}

// Worker Categories
export type WorkerCategory = 
  | 'electrician' 
  | 'plumber' 
  | 'ac-mechanic' 
  | 'carpenter' 
  | 'painter';

export const WORKER_CATEGORIES: { id: WorkerCategory; name: string; nameUrdu: string; icon: string }[] = [
  { id: 'electrician', name: 'Electrician', nameUrdu: 'الیکٹریشن', icon: 'Zap' },
  { id: 'plumber', name: 'Plumber', nameUrdu: 'پلمبر', icon: 'Droplets' },
  { id: 'ac-mechanic', name: 'AC Mechanic', nameUrdu: 'اے سی مکینک', icon: 'Wind' },
  { id: 'carpenter', name: 'Carpenter', nameUrdu: 'بڑھئی', icon: 'Hammer' },
  { id: 'painter', name: 'Painter', nameUrdu: 'پینٹر', icon: 'Paintbrush' },
];

// Verification Status
export interface VerificationStatus {
  cnic: boolean;
  police: boolean;
  skill: boolean;
  backgroundCheck: boolean;
}

// Service
export interface Service {
  id: string;
  name: string;
  priceMin: number;
  priceMax: number;
  duration: string;
}

// Availability
export interface Availability {
  monday: DayAvailability;
  tuesday: DayAvailability;
  wednesday: DayAvailability;
  thursday: DayAvailability;
  friday: DayAvailability;
  saturday: DayAvailability;
  sunday: DayAvailability;
  emergencyAvailable: boolean;
}

export interface DayAvailability {
  available: boolean;
  startTime?: string;
  endTime?: string;
}

// Booking Types
export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'in-progress' 
  | 'completed' 
  | 'cancelled' 
  | 'disputed';

export interface Booking {
  id: string;
  customerId: string;
  workerId: string;
  worker: {
    name: string;
    photo: string;
    category: WorkerCategory;
    phone: string;
  };
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  service: string;
  serviceDescription?: string;
  date: string;
  timeSlot: string;
  address: string;
  status: BookingStatus;
  estimatedPrice: { min: number; max: number };
  finalPrice?: number;
  platformFee: number;
  paymentMethod?: 'cash' | 'jazzcash' | 'easypaisa';
  paymentStatus?: 'pending' | 'paid';
  specialInstructions?: string;
  photos?: string[];
  rating?: number;
  review?: string;
  createdAt: string;
  timeline: BookingTimelineEvent[];
}

export interface BookingTimelineEvent {
  event: string;
  timestamp: string;
}

// Review Types
export interface Review {
  id: string;
  workerId: string;
  customerId: string;
  customerName: string;
  bookingId: string;
  service: string;
  rating: number;
  text: string;
  photos?: string[];
  createdAt: string;
  response?: string;
  responseAt?: string;
}

// Filter Types
export interface WorkerFilters {
  category?: WorkerCategory;
  location?: string;
  availableToday?: boolean;
  minRating?: number;
  priceMin?: number;
  priceMax?: number;
  experienceMin?: number;
  specialties?: string[];
  sortBy?: 'rating' | 'jobs' | 'nearest' | 'price-low' | 'price-high' | 'newest';
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: 'booking' | 'review' | 'system' | 'payment';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// Analytics Types (Admin)
export interface PlatformStats {
  totalCustomers: number;
  totalWorkers: number;
  totalBookings: number;
  totalRevenue: number;
  averageRating: number;
  monthlyGrowth: {
    customers: number;
    workers: number;
    bookings: number;
    revenue: number;
  };
}

// Language
export type Language = 'en' | 'ur';
