import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PropertyService, Property } from '../../services/property.service';
import { HousingService, HousingSummary } from '../../services/housing.service';

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
export class Explore implements OnInit {
  viewMode = signal<'grid' | 'list'>('grid');
  showFilters = signal(false);
  
  // All properties loaded from service
  allProperties = signal<Property[]>([]);
  
  // Filter signals (reactive)
  searchLocation = signal('');
  priceRange = signal(500);
  propertyType = signal('');
  rating = signal(0);
  bedrooms = signal(0);
  bathrooms = signal(0);
  sortBy = signal('recommended');
  
  // Search bar inputs (not used in filtering yet, for future enhancement)
  checkInOut = '';
  guests = '';
  
  propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Cabin', 'Loft'];
  ratingOptions = [5, 4, 3, 2];
  
  // Computed filtered and sorted properties
  filteredProperties = computed(() => {
    let results = [...this.allProperties()];
    
    // Filter by price range
    const maxPrice = this.priceRange();
    results = results.filter(p => p.price <= maxPrice);
    
    // Filter by property type
    const type = this.propertyType();
    if (type && type !== 'All') {
      results = results.filter(p => p.type === type);
    }
    
    // Filter by minimum rating
    const minRating = this.rating();
    if (minRating > 0) {
      results = results.filter(p => p.rating >= minRating);
    }
    
    // Filter by minimum bedrooms
    const minBedrooms = this.bedrooms();
    if (minBedrooms > 0) {
      results = results.filter(p => (p.bedrooms ?? 0) >= minBedrooms);
    }
    
    // Filter by minimum bathrooms
    const minBathrooms = this.bathrooms();
    if (minBathrooms > 0) {
      results = results.filter(p => (p.bathrooms ?? 0) >= minBathrooms);
    }
    
    // Apply sorting
    const sort = this.sortBy();
    switch (sort) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        results.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'recommended':
      default:
        // Keep original order (or add custom recommendation logic)
        break;
    }
    
    return results;
  });
  
  // Computed property count for display
  propertyCount = computed(() => this.filteredProperties().length);
  
  loading = signal(true);
  backendProperties = signal<HousingSummary[]>([]);

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    // Load properties from backend
    this.housingService.getAllHousings(0, 50).subscribe({
      next: (response) => {
        this.backendProperties.set(response.content);
        // Map backend properties to frontend Property interface
        const mapped = response.content.map(h => this.mapHousingToProperty(h));
        this.allProperties.set(mapped);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading properties:', error);
        // Fallback to mock data
        this.propertyService.getAllProperties().subscribe({
          next: (properties) => {
            this.allProperties.set(properties);
            this.loading.set(false);
          }
        });
      }
    });
  }

  mapHousingToProperty(housing: HousingSummary): Property {
    return {
      id: housing.id.toString(),
      title: housing.title,
      description: 'Explore this amazing property',
      price: housing.pricePerNight,
      location: `${housing.city}, ${housing.address}`,
      city: housing.city,
      country: 'Colombia',
      rating: 4.5,
      reviews: 0,
      reviewCount: 0,
      bedrooms: 2,
      bathrooms: 1,
      guests: housing.maxCapacity,
      area: 1200,
      type: 'Apartment',
      images: housing.imageUrl ? [housing.imageUrl] : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
      imageUrl: housing.imageUrl || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      amenities: [],
      host: {
        name: 'Host',
        avatar: 'https://i.pravatar.cc/150?img=5',
        joinDate: '2024-01',
        verified: true
      },
      coordinates: { lat: 0, lng: 0 },
      isNew: true,
      featured: false
    };
  }
  
  toggleViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }
  
  toggleFilters() {
    this.showFilters.set(!this.showFilters());
  }
  
  clearFilters() {
    this.priceRange.set(500);
    this.propertyType.set('');
    this.rating.set(0);
    this.bedrooms.set(0);
    this.bathrooms.set(0);
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
