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
  
  // All properties loaded from backend (unfiltered)
  allProperties = signal<Property[]>([]);
  
  // Displayed properties (after filters applied)
  displayedProperties = signal<Property[]>([]);
  
  // Filter values
  searchLocation = signal('');
  minPrice = signal(0);
  maxPrice = signal(10000); // High default to show all
  propertyType = signal('All');
  minRating = signal(0);
  minBedrooms = signal(0);
  minBathrooms = signal(0);
  sortBy = signal('recommended');
  
  // Dynamic max price from loaded properties
  maxAvailablePrice = signal(10000);
  
  // UI state
  checkInOut = '';
  guests = '';
  
  propertyTypes = ['All', 'Apartment', 'House', 'Villa', 'Cabin', 'Loft'];
  ratingOptions = [5, 4, 3, 2];
  
  // Computed property count
  propertyCount = computed(() => this.displayedProperties().length);
  
  // Alias for backward compatibility with template
  filteredProperties = computed(() => this.displayedProperties());
  
  loading = signal(true);
  backendProperties = signal<HousingSummary[]>([]);

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    console.log('🔍 [Explore] ===== COMPONENT INITIALIZED =====');
    console.log('🔍 [Explore] allProperties count:', this.allProperties().length);
    console.log('🔍 [Explore] Starting to load properties...');
    this.loadAllProperties();
  }

  /**
   * Load properties from multiple cities
   */
  loadAllProperties() {
    console.log('📡 [Explore] Starting parallel load from 5 cities...');
    this.loading.set(true);
    const cities = ['Medellin', 'Bogota', 'Cali', 'Barranquilla', 'Cartagena'];
    let loadedCount = 0;
    const allHousings: HousingSummary[] = [];

    cities.forEach((city, index) => {
      console.log(`📡 [Explore] Requesting city ${index + 1}/5: ${city}`);
      
      this.housingService.getAllHousings(0, 50, city).subscribe({
        next: (response) => {
          console.log(`✅ [Explore] SUCCESS ${city}: ${response.content.length} properties`);
          console.log(`   Data:`, response.content);
          allHousings.push(...response.content);
          loadedCount++;

          // When all cities are loaded
          if (loadedCount === cities.length) {
            console.log(`🎉 [Explore] All cities loaded! Total housings: ${allHousings.length}`);
            this.processLoadedProperties(allHousings);
          }
        },
        error: (err) => {
          console.error(`❌ [Explore] ERROR ${city}:`, err);
          console.error(`   Status: ${err.status}, Message:`, err.message);
          
          // Check for auth error
          if (err.status === 401) {
            console.error('🔒 AUTHENTICATION REQUIRED! Please login first.');
            console.error('   Go to /login or click "Sign in" button');
          }
          
          loadedCount++;
          
          if (loadedCount === cities.length) {
            console.log(`⚠️ [Explore] All requests completed. Total: ${allHousings.length}`);
            
            // If all failed due to auth, show message
            if (allHousings.length === 0 && err.status === 401) {
              this.loading.set(false);
              alert('Please login to view properties. Click "Sign in" button.');
              this.router.navigate(['/login']);
              return;
            }
            
            this.processLoadedProperties(allHousings);
          }
        }
      });
    });
  }

  /**
   * Process and deduplicate loaded properties
   */
  processLoadedProperties(housings: HousingSummary[]) {
    // Remove duplicates by ID
    const uniqueHousings = Array.from(
      new Map(housings.map(h => [h.id, h])).values()
    );

    console.log(`✅ [Explore] Total unique properties: ${uniqueHousings.length}`);
    this.backendProperties.set(uniqueHousings);
    
    // Map to Property interface
    const mapped = uniqueHousings
      .map(h => this.mapHousingToProperty(h))
      .filter(p => p !== null) as Property[];
    
    this.allProperties.set(mapped);
    
    // Calculate max price from loaded properties
    if (mapped.length > 0) {
      const calculatedMax = Math.max(...mapped.map(p => p.price));
      this.maxAvailablePrice.set(calculatedMax);
      this.maxPrice.set(calculatedMax); // Set filter to max
      console.log(`💰 Max price: $${calculatedMax}`);
    }
    
    // Show all properties initially (no filters applied)
    this.displayedProperties.set(mapped);
    this.loading.set(false);

    // Fallback to mock data if nothing loaded
    if (mapped.length === 0) {
      console.log('⚠️ [Explore] No properties, using mock data');
      this.propertyService.getAllProperties().subscribe({
        next: (properties) => {
          this.allProperties.set(properties);
          this.displayedProperties.set(properties);
          this.loading.set(false);
        }
      });
    }
  }

  /**
   * Apply all filters to properties
   */
  applyFilters() {
    console.log('🔍 Applying filters...');
    let results = [...this.allProperties()];
    
    // Filter by price range
    const min = this.minPrice();
    const max = this.maxPrice();
    results = results.filter(p => p.price >= min && p.price <= max);
    console.log(`  💰 Price filter ($${min}-$${max}): ${results.length} properties`);
    
    // Filter by property type
    const type = this.propertyType();
    if (type && type !== 'All') {
      results = results.filter(p => p.type === type);
      console.log(`  🏠 Type filter (${type}): ${results.length} properties`);
    }
    
    // Filter by minimum rating
    const rating = this.minRating();
    if (rating > 0) {
      results = results.filter(p => p.rating >= rating);
      console.log(`  ⭐ Rating filter (>=${rating}): ${results.length} properties`);
    }
    
    // Filter by bedrooms
    const beds = this.minBedrooms();
    if (beds > 0) {
      results = results.filter(p => (p.bedrooms ?? 0) >= beds);
      console.log(`  🛏️ Bedrooms filter (>=${beds}): ${results.length} properties`);
    }
    
    // Filter by bathrooms
    const baths = this.minBathrooms();
    if (baths > 0) {
      results = results.filter(p => (p.bathrooms ?? 0) >= baths);
      console.log(`  🚿 Bathrooms filter (>=${baths}): ${results.length} properties`);
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
    }
    
    console.log(`✅ Final result: ${results.length} properties`);
    this.displayedProperties.set(results);
  }

  /**
   * Safely map backend housing to frontend Property
   */
  mapHousingToProperty(housing: HousingSummary): Property | null {
    try {
      // Validate required fields
      if (!housing || !housing.id || !housing.title || !housing.city) {
        console.warn('⚠️ Invalid housing data:', housing);
        return null;
      }

      return {
        id: housing.id.toString(),
        title: housing.title || 'Property',
        description: 'Beautiful property in Colombia',
        price: housing.nightPrice || 100,
        location: `${housing.city}${housing.address ? ', ' + housing.address : ''}`,
        city: housing.city,
        country: 'Colombia',
        rating: housing.averageRating || 4.5,
        reviews: 0,
        reviewCount: 0,
        bedrooms: 2,
        bathrooms: 1,
        guests: housing.maxCapacity || 4,
        area: 1200,
        type: 'Apartment',
        images: housing.principalImage ? [housing.principalImage] : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
        imageUrl: housing.principalImage || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
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
    } catch (error) {
      console.error('❌ Error mapping housing:', error, housing);
      return null;
    }
  }
  
  toggleViewMode(mode: 'grid' | 'list') {
    this.viewMode.set(mode);
  }
  
  toggleFilters() {
    this.showFilters.set(!this.showFilters());
  }
  
  /**
   * Clear all filters and show all properties
   */
  clearFilters() {
    console.log('🧹 Clearing all filters');
    this.minPrice.set(0);
    this.maxPrice.set(this.maxAvailablePrice());
    this.propertyType.set('All');
    this.minRating.set(0);
    this.minBedrooms.set(0);
    this.minBathrooms.set(0);
    this.searchLocation.set('');
    
    // Show all properties
    this.displayedProperties.set(this.allProperties());
  }
  
  /**
   * Search properties with filters from search bar
   */
  searchProperties() {
    const location = this.searchLocation().trim();
    console.log('🔍 Searching with location:', location);

    if (!location) {
      // If no location, show all properties
      this.loadAllProperties();
      return;
    }

    // Search by specific city
    this.loading.set(true);
    this.housingService.getAllHousings(0, 50, location).subscribe({
      next: (response) => {
        console.log(`✅ Found ${response.content.length} properties in ${location}`);
        const mapped = response.content
          .map(h => this.mapHousingToProperty(h))
          .filter(p => p !== null) as Property[];
        
        this.allProperties.set(mapped);
        this.loading.set(false);

        if (mapped.length === 0) {
          // Try partial match in all properties
          this.searchInAllProperties(location);
        }
      },
      error: (err) => {
        console.warn(`⚠️ Search failed for ${location}:`, err);
        this.searchInAllProperties(location);
      }
    });
  }

  /**
   * Search within already loaded properties
   */
  searchInAllProperties(searchTerm: string) {
    const term = searchTerm.toLowerCase();
    const filtered = this.backendProperties().filter(h => 
      h.city?.toLowerCase().includes(term) ||
      h.title?.toLowerCase().includes(term) ||
      h.address?.toLowerCase().includes(term)
    );

    if (filtered.length > 0) {
      const mapped = filtered
        .map(h => this.mapHousingToProperty(h))
        .filter(p => p !== null) as Property[];
      this.allProperties.set(mapped);
      console.log(`✅ Found ${mapped.length} properties matching "${searchTerm}"`);
    } else {
      this.allProperties.set([]);
      console.log(`❌ No properties found matching "${searchTerm}"`);
    }
    this.loading.set(false);
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
