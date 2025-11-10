import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Star, MapPin, Users, Bed, Bath, Wifi, Car, Tv, Wind, Calendar, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-angular';
import { PropertyService } from '../../services/property.service';
import { HousingService, HousingDetails } from '../../services/housing.service';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-property-details',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, HeaderComponent, FooterComponent],
  templateUrl: './property-details.html',
  styleUrls: ['./property-details.css']
})
export class PropertyDetailsComponent implements OnInit {
  // Icons
  Star = Star;
  MapPin = MapPin;
  Users = Users;
  Bed = Bed;
  Bath = Bath;
  Wifi = Wifi;
  Car = Car;
  Tv = Tv;
  Wind = Wind;
  Calendar = Calendar;
  Heart = Heart;
  Share2 = Share2;
  ChevronLeft = ChevronLeft;
  ChevronRight = ChevronRight;

  // Signals
  loading = signal(true);
  property = signal<any>(null);
  selectedImageIndex = signal(0);
  checkInDate = signal('');
  checkOutDate = signal('');
  guests = signal(1);

  // Computed
  currentImage = computed(() => {
    const images = this.property()?.images || [];
    return images[this.selectedImageIndex()] || '';
  });

  nights = computed(() => {
    if (!this.checkInDate() || !this.checkOutDate()) return 0;
    const start = new Date(this.checkInDate());
    const end = new Date(this.checkOutDate());
    const diff = end.getTime() - start.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  });

  subtotal = computed(() => {
    return (this.property()?.price || 0) * this.nights();
  });

  serviceFee = computed(() => {
    return Math.round(this.subtotal() * 0.1);
  });

  cleaningFee = computed(() => {
    return this.property()?.price ? Math.round(this.property().price * 0.15) : 0;
  });

  total = computed(() => {
    return this.subtotal() + this.serviceFee() + this.cleaningFee();
  });

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private propertyService: PropertyService,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProperty(id);
    }
  }

  loadProperty(id: string) {
    this.loading.set(true);
    
    // Try to load from backend first
    const numericId = parseInt(id);
    if (!isNaN(numericId)) {
      this.housingService.getHousingById(numericId).subscribe({
        next: (housing) => {
          const property = this.mapHousingToProperty(housing);
          this.property.set(property);
          this.loading.set(false);
        },
        error: (error) => {
          console.error('Error loading housing from backend:', error);
          // Fallback to mock data
          this.loadMockProperty(id);
        }
      });
    } else {
      // Load mock data for non-numeric IDs
      this.loadMockProperty(id);
    }
  }

  loadMockProperty(id: string) {
    this.propertyService.getPropertyById(id).subscribe({
      next: (property) => {
        this.property.set(property);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading property:', error);
        this.loading.set(false);
      }
    });
  }

  mapHousingToProperty(housing: HousingDetails): any {
    return {
      id: housing.id.toString(),
      title: housing.title,
      description: housing.description,
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
      images: housing.images.length > 0 
        ? housing.images.map(img => img.url) 
        : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
      imageUrl: housing.images[0]?.url || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      amenities: housing.services || [],
      host: {
        name: housing.hostName || 'Host',
        avatar: 'https://i.pravatar.cc/150?img=5',
        joinDate: '2024-01',
        verified: true
      },
      coordinates: { 
        lat: housing.latitude, 
        lng: housing.length 
      },
      isNew: true,
      featured: false
    };
  }

  selectImage(index: number) {
    this.selectedImageIndex.set(index);
  }

  previousImage() {
    const images = this.property()?.images || [];
    if (images.length > 0) {
      const newIndex = this.selectedImageIndex() === 0 
        ? images.length - 1 
        : this.selectedImageIndex() - 1;
      this.selectedImageIndex.set(newIndex);
    }
  }

  nextImage() {
    const images = this.property()?.images || [];
    if (images.length > 0) {
      const newIndex = (this.selectedImageIndex() + 1) % images.length;
      this.selectedImageIndex.set(newIndex);
    }
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  bookNow() {
    if (!this.checkInDate() || !this.checkOutDate()) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    this.router.navigate(['/booking'], {
      queryParams: {
        propertyId: this.property()?.id,
        checkIn: this.checkInDate(),
        checkOut: this.checkOutDate(),
        guests: this.guests()
      }
    });
  }

  goBack() {
    this.router.navigate(['/explore']);
  }
}
