export interface GalleryItem {
  id: string;
  url: string;
  category: 'exterior' | 'interior' | 'banya' | 'surroundings';
  title: string;
  description: string;
}

export interface Amenity {
  id: string;
  name: string;
  description: string;
  icon: string; // lucide icon name
  included: boolean;
  price?: string;
}

export interface Review {
  id: string;
  name: string;
  date: string;
  source: 'Авито' | 'Суточно.ру';
  rating: number;
  text: string;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BookingDetails {
  startDate: string;
  endDate: string;
  guests: number;
  hasPets: boolean;
  banyaHours: number;
  bikes: number;
  bikeDays: number;
  sups: number;
  supDays: number;
}
