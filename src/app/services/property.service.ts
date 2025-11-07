import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  country: string;
  rating: number;
  reviews: number;
  reviewCount?: number; // Alias for compatibility
  bedrooms: number;
  bathrooms: number;
  guests: number;
  area: number;
  type: string;
  images: string[];
  imageUrl?: string; // Primary image for cards
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    joinDate: string;
    verified: boolean;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  isNew?: boolean;
  featured?: boolean;
}

export interface Review {
  id: string;
  propertyId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Booking {
  id: string;
  propertyId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  // Simulated data - ready to be replaced with HTTP calls
  private properties = signal<Property[]>([
    {
      id: '1',
      title: 'Luxury Beachfront Villa',
      description: 'Experience ultimate luxury in this stunning beachfront villa with panoramic ocean views. This property features modern architecture, high-end finishes, and direct beach access. Perfect for families or groups seeking a memorable vacation.',
      price: 450,
      location: 'Malibu Beach, California',
      city: 'Malibu',
      country: 'USA',
      rating: 4.9,
      reviews: 128,
      reviewCount: 128,
      bedrooms: 4,
      bathrooms: 3,
      guests: 8,
      area: 2800,
      type: 'Villa',
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
      amenities: [
        'WiFi', 'Pool', 'Beach Access', 'Air Conditioning', 'Kitchen',
        'Parking', 'TV', 'Washer', 'Ocean View', 'BBQ Grill'
      ],
      host: {
        name: 'Sarah Johnson',
        avatar: 'https://i.pravatar.cc/150?img=5',
        joinDate: '2020-03',
        verified: true
      },
      coordinates: { lat: 34.0259, lng: -118.7798 },
      isNew: true,
      featured: true
    },
    {
      id: '2',
      title: 'Modern Downtown Apartment',
      description: 'Stylish apartment in the heart of downtown with stunning city views. Features contemporary design, fully equipped kitchen, and access to building amenities including gym and rooftop terrace.',
      price: 180,
      location: 'Downtown, New York',
      city: 'New York',
      country: 'USA',
      rating: 4.7,
      reviews: 89,
      reviewCount: 89,
      bedrooms: 2,
      bathrooms: 2,
      guests: 4,
      area: 1200,
      type: 'Apartment',
      images: [
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800',
        'https://images.unsplash.com/photo-1560185127-6a7f6f60c3c6?w=800'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      amenities: [
        'WiFi', 'Gym', 'Air Conditioning', 'Kitchen', 'Elevator',
        'City View', 'TV', 'Washer & Dryer'
      ],
      host: {
        name: 'Michael Chen',
        avatar: 'https://i.pravatar.cc/150?img=12',
        joinDate: '2019-08',
        verified: true
      },
      coordinates: { lat: 40.7128, lng: -74.0060 },
      featured: true
    },
    {
      id: '3',
      title: 'Cozy Mountain Cabin',
      description: 'Escape to this charming cabin nestled in the mountains. Perfect retreat for nature lovers with hiking trails nearby and breathtaking mountain views.',
      price: 220,
      location: 'Aspen, Colorado',
      city: 'Aspen',
      country: 'USA',
      rating: 4.8,
      reviews: 64,
      reviewCount: 64,
      bedrooms: 3,
      bathrooms: 2,
      guests: 6,
      area: 1800,
      type: 'Cabin',
      images: [
        'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800'
      ],
      imageUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800',
      amenities: [
        'WiFi', 'Fireplace', 'Kitchen', 'Parking', 'Mountain View',
        'Heating', 'BBQ Grill'
      ],
      host: {
        name: 'Emily Thompson',
        avatar: 'https://i.pravatar.cc/150?img=9',
        joinDate: '2021-01',
        verified: true
      },
      coordinates: { lat: 39.1911, lng: -106.8175 },
      isNew: false
    }
  ]);

  private reviews = signal<Review[]>([
    {
      id: 'r1',
      propertyId: '1',
      userName: 'John Davis',
      userAvatar: 'https://i.pravatar.cc/150?img=1',
      rating: 5,
      comment: 'Absolutely stunning property! The ocean views were breathtaking and the villa exceeded all our expectations. Sarah was an excellent host.',
      date: '2024-10-15'
    },
    {
      id: 'r2',
      propertyId: '1',
      userName: 'Emma Wilson',
      userAvatar: 'https://i.pravatar.cc/150?img=2',
      rating: 5,
      comment: 'Perfect location for a family vacation. The beach access was amazing and the kids loved the pool. Highly recommend!',
      date: '2024-09-28'
    },
    {
      id: 'r3',
      propertyId: '1',
      userName: 'Robert Martinez',
      userAvatar: 'https://i.pravatar.cc/150?img=3',
      rating: 4,
      comment: 'Beautiful villa with great amenities. Only minor issue was the wifi could be stronger, but overall a wonderful stay.',
      date: '2024-09-10'
    }
  ]);

  constructor() {}

  // Simulate API call - ready to replace with HttpClient
  getPropertyById(id: string): Observable<Property | undefined> {
    const property = this.properties().find(p => p.id === id);
    return of(property).pipe(delay(500)); // Simulate network delay
  }

  // Simulate API call
  getAllProperties(): Observable<Property[]> {
    return of(this.properties()).pipe(delay(300));
  }

  // Simulate API call
  getFeaturedProperties(): Observable<Property[]> {
    const featured = this.properties().filter(p => p.featured);
    return of(featured).pipe(delay(300));
  }

  // Simulate API call
  getPropertyReviews(propertyId: string): Observable<Review[]> {
    const propertyReviews = this.reviews().filter(r => r.propertyId === propertyId);
    return of(propertyReviews).pipe(delay(400));
  }

  // Simulate API call for creating a booking
  createBooking(booking: Omit<Booking, 'id' | 'status'>): Observable<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}`,
      status: 'pending'
    };
    return of(newBooking).pipe(delay(600));
  }

  // Simulate API call for checking availability
  checkAvailability(propertyId: string, checkIn: string, checkOut: string): Observable<boolean> {
    // Simulate availability check - always returns true for demo
    return of(true).pipe(delay(400));
  }

  // Helper method to calculate total price
  calculateTotalPrice(pricePerNight: number, checkIn: string, checkOut: string): number {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const subtotal = pricePerNight * nights;
    const serviceFee = subtotal * 0.1;
    const cleaningFee = 50;
    return subtotal + serviceFee + cleaningFee;
  }

  /* 
   * READY FOR BACKEND INTEGRATION:
   * Replace the methods above with actual HTTP calls like:
   * 
   * constructor(private http: HttpClient) {}
   * 
   * getPropertyById(id: string): Observable<Property | undefined> {
   *   return this.http.get<Property>(`${API_URL}/properties/${id}`);
   * }
   * 
   * createBooking(booking: Omit<Booking, 'id' | 'status'>): Observable<Booking> {
   *   return this.http.post<Booking>(`${API_URL}/bookings`, booking);
   * }
   */
}
