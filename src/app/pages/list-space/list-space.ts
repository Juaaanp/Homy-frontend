import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { HousingService, CreateHousingDTO } from '../../services/housing.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

// Host "List your space" wizard with backend integration
// Steps: 1 Basic -> 2 Location -> 3 Pricing -> 4 Amenities -> 5 Review

type Step = 1 | 2 | 3 | 4 | 5;

@Component({
  selector: 'app-list-space',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, HeaderComponent, FooterComponent, ButtonComponent],
  templateUrl: './list-space.html',
  styleUrls: ['./list-space.css']
})
export class ListSpace implements OnInit {
  step = signal<Step>(1);
  submitting = signal(false);
  submitted = signal(false);
  errorMessage = signal('');

  // Form state
  title = signal('');
  description = signal('');
  type = signal('Apartment');
  guests = signal(2);
  bedrooms = signal(1);
  bathrooms = signal(1);

  country = signal('Colombia');
  city = signal('');
  address = signal('');
  latitude = signal(0);
  longitude = signal(0);

  price = signal(180);

  // Backend only supports: WIFI, PARKING, POOL, GYM, PETS_ALLOWED, AIR_CONDITIONING, BREAKFAST_INCLUDED
  amenityOptions = ['WiFi', 'Air Conditioning', 'Parking', 'Pool', 'Pet Friendly'];
  amenities = signal<string[]>([]);

  // Derived
  validBasic = computed(() => this.title().trim().length >= 6 && this.guests() >= 1);
  validLocation = computed(() => this.city().trim().length >= 2 && this.address().trim().length >= 6);
  validPricing = computed(() => this.price() > 0);

  constructor(
    private router: Router,
    private housingService: HousingService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    // Check if user is logged in and is HOST
    if (!this.tokenService.isLogged()) {
      Swal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'Please login as a HOST to list your property',
        confirmButtonColor: '#f97316'
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

    const role = this.tokenService.getRole();
    const email = this.tokenService.getEmail();
    const userId = this.tokenService.getUserId();
    
    console.log('DEBUG - User Info:', { role, email, userId });
    
    if (role !== 'HOST') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        html: `Only HOSTs can list properties.<br><br>
               <strong>Your current role:</strong> ${role || 'undefined'}<br>
               <strong>Email:</strong> ${email || 'undefined'}<br>
               <strong>User ID:</strong> ${userId || 'undefined'}<br><br>
               Please logout and login with a HOST account.<br><br>
               <small>HOST credentials: juandal@gmail.com / Homy2024</small>`,
        confirmButtonText: 'Logout Now',
        showCancelButton: true,
        cancelButtonText: 'Go Home',
        confirmButtonColor: '#f97316',
        cancelButtonColor: '#6b7280',
        width: '600px'
      }).then((result) => {
        if (result.isConfirmed) {
          // Logout user
          this.tokenService.logout();
          this.router.navigate(['/login']);
        } else {
          this.router.navigate(['/']);
        }
      });
    } else {
      // User is HOST, allow access
      console.log('✅ User is HOST, access granted');
    }
  }

  toggleAmenity(a: string) {
    const set = new Set(this.amenities());
    if (set.has(a)) set.delete(a); else set.add(a);
    this.amenities.set(Array.from(set));
  }

  next() {
    if (this.step() === 1 && !this.validBasic()) return;
    if (this.step() === 2 && !this.validLocation()) return;
    if (this.step() === 3 && !this.validPricing()) return;
    this.step.set((this.step() + 1) as Step);
  }

  back() {
    this.step.set((this.step() - 1) as Step);
  }

  submit() {
    this.submitting.set(true);
    this.errorMessage.set('');

    // Build description from form data
    const fullDescription = this.description() || 
      `${this.type()} in ${this.city()}, ${this.country()}. ` +
      `Accommodates ${this.guests()} guests with ${this.bedrooms()} bedroom(s) and ${this.bathrooms()} bathroom(s). ` +
      `${this.amenities().length > 0 ? 'Amenities include: ' + this.amenities().join(', ') + '.' : ''}`;

    // Create housing DTO
    const housingData: CreateHousingDTO = {
      title: this.title(),
      description: fullDescription,
      city: this.city(),
      latitude: Number(this.latitude()) || 6.2442, // Default to Medellín if not set
      length: Number(this.longitude()) || -75.5812, // Note: backend uses "length" not "longitude"
      address: this.address(),
      maxCapacity: Number(this.guests()),
      pricePerNight: Number(this.price()),
      services: this.housingService.mapAmenitiesToServices(this.amenities()),
      imagesUrls: [] // Will be added when image upload is implemented
    };

    // Debug: Log data types and values
    console.log('🔍 Housing data before sending:', {
      title: `"${housingData.title}" (${typeof housingData.title})`,
      description: `"${housingData.description}" (${typeof housingData.description})`,
      city: `"${housingData.city}" (${typeof housingData.city})`,
      latitude: `${housingData.latitude} (${typeof housingData.latitude})`,
      length: `${housingData.length} (${typeof housingData.length})`,
      address: `"${housingData.address}" (${typeof housingData.address})`,
      maxCapacity: `${housingData.maxCapacity} (${typeof housingData.maxCapacity})`,
      pricePerNight: `${housingData.pricePerNight} (${typeof housingData.pricePerNight})`,
      services: housingData.services,
      imagesUrls: housingData.imagesUrls
    });
    console.log('📤 Sending JSON:', JSON.stringify(housingData, null, 2));

    this.housingService.createHousing(housingData).subscribe({
      next: (response) => {
        this.submitting.set(false);
        this.submitted.set(true);
        
        Swal.fire({
          icon: 'success',
          title: 'Property Listed!',
          text: response.message || 'Your property has been successfully listed',
          confirmButtonColor: '#f97316'
        }).then(() => {
          this.router.navigate(['/']);
        });
      },
      error: (error) => {
        this.submitting.set(false);
        console.error('Error creating housing:', error);
        
        const errorMsg = error.error?.message || 'Failed to create property. Please try again.';
        this.errorMessage.set(errorMsg);
        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMsg,
          confirmButtonColor: '#f97316'
        });
      }
    });
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
