import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Star, MapPin, Users, Bed, Bath, Wifi, Car, Tv, Wind, Calendar, Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-angular';
import { PropertyService } from '../../services/property.service';
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
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadProperty(id);
    }
  }

  loadProperty(id: string) {
    this.loading.set(true);
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
