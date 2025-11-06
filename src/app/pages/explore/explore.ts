import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isNew?: boolean;
  bedrooms: number;
  bathrooms: number;
}

@Component({
  selector: 'app-explore',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './explore.html',
  styleUrl: './explore.css'
})
export class Explore {
  viewMode = signal<'grid' | 'list'>('grid');
  showFilters = signal(false);
  
  // Filtros
  searchLocation = '';
  checkInOut = '';
  guests = '';
  priceRange = 500;
  propertyType = '';
  rating = 0;
  bedrooms = 0;
  bathrooms = 0;
  sortBy = 'recommended';
  
  propertyTypes = ['Apartment', 'House', 'Villa', 'Cabin', 'Loft'];
  ratingOptions = [4, 3, 2];
  
  properties: Property[] = [
    {
      id: "1",
      title: "Modern Apartment in El Poblado",
      location: "Medellín, Antioquia",
      price: 120,
      rating: 4.9,
      reviewCount: 156,
      imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
      isNew: true,
      bedrooms: 2,
      bathrooms: 2
    },
    {
      id: "2",
      title: "Beachfront Villa in Cartagena",
      location: "Cartagena, Bolívar",
      price: 200,
      rating: 4.8,
      reviewCount: 89,
      imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500",
      bedrooms: 3,
      bathrooms: 2
    },
    {
      id: "3",
      title: "Coffee Farm Experience",
      location: "Armenia, Quindío",
      price: 75,
      rating: 4.7,
      reviewCount: 203,
      imageUrl: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=500",
      isNew: true,
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: "4",
      title: "Modern Loft in Bogotá",
      location: "Bogotá D.C.",
      price: 95,
      rating: 4.6,
      reviewCount: 134,
      imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=500",
      bedrooms: 1,
      bathrooms: 1
    },
    {
      id: "5",
      title: "Mountain Cabin in Manizales",
      location: "Manizales, Caldas",
      price: 110,
      rating: 4.9,
      reviewCount: 78,
      imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=500",
      bedrooms: 2,
      bathrooms: 1
    },
    {
      id: "6",
      title: "Luxury Penthouse in Cali",
      location: "Cali, Valle del Cauca",
      price: 180,
      rating: 4.8,
      reviewCount: 92,
      imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=500",
      bedrooms: 3,
      bathrooms: 2
    }
  ];
  
  constructor(private router: Router) {}
  
  toggleViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }
  
  toggleFilters() {
    this.showFilters.set(!this.showFilters());
  }
  
  clearFilters() {
    this.priceRange = 500;
    this.propertyType = '';
    this.rating = 0;
    this.bedrooms = 0;
    this.bathrooms = 0;
  }
  
  searchProperties() {
    console.log('Searching with:', {
      location: this.searchLocation,
      checkInOut: this.checkInOut,
      guests: this.guests
    });
  }
  
  viewProperty(id: string) {
    this.router.navigate(['/property', id]);
  }

  bookProperty(propertyId: string) {
    this.router.navigate(['/booking'], {
      queryParams: { propertyId }
    });
  }
  
  getStarArray(count: number): number[] {
    return Array(5).fill(0).map((_, i) => i);
  }
}
