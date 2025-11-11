import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { HousingService, CreateHousingDTO, HousingDetails } from '../../services/housing.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

type Step = 1 | 2 | 3 | 4 | 5;

@Component({
  selector: 'app-edit-listing',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, HeaderComponent, FooterComponent, ButtonComponent],
  templateUrl: './edit-listing.html',
  styleUrls: ['./edit-listing.css']
})
export class EditListing implements OnInit {
  step = signal<Step>(1);
  submitting = signal(false);
  loading = signal(true);
  housingId = signal<number | null>(null);

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

  amenityOptions = ['WiFi', 'Air Conditioning', 'Parking', 'Pool', 'Pet Friendly'];
  amenities = signal<string[]>([]);

  // Derived
  validBasic = computed(() => this.title().trim().length >= 6 && this.guests() >= 1);
  validLocation = computed(() => this.city().trim().length >= 2 && this.address().trim().length >= 6);
  validPricing = computed(() => this.price() > 0);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private housingService: HousingService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    // Check if user is logged in and is HOST
    if (!this.tokenService.isLogged()) {
      Swal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'Please login as a HOST to edit your property',
        confirmButtonColor: '#f97316'
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

    const role = this.tokenService.getRole();
    if (role !== 'HOST') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Only HOSTs can edit properties',
        confirmButtonColor: '#f97316'
      }).then(() => {
        this.router.navigate(['/']);
      });
      return;
    }

    // Load existing housing data
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const numericId = parseInt(id);
      if (!isNaN(numericId)) {
        this.housingId.set(numericId);
        this.loadHousingData(numericId);
      } else {
        this.showErrorAndNavigate('Invalid property ID');
      }
    } else {
      this.showErrorAndNavigate('Property ID not provided');
    }
  }

  loadHousingData(id: number) {
    this.loading.set(true);
    
    console.log('🔄 Loading housing data for ID:', id);
    
    this.housingService.getHousingById(id).subscribe({
      next: (housing) => {
        console.log('✅ Housing loaded for editing:', housing);
        
        // Fill form with existing data
        this.title.set(housing.title || '');
        this.description.set(housing.description || '');
        this.city.set(housing.city || '');
        this.address.set(housing.address || '');
        this.latitude.set(housing.latitude || 0);
        this.longitude.set(housing.length || 0);
        this.guests.set(housing.maxCapacity || 1);
        this.price.set(housing.nightPrice || 0);
        
        // Map services back to amenities
        if (housing.services && housing.services.length > 0) {
          const mappedAmenities = this.housingService.mapServicesToAmenities(housing.services);
          console.log('🔄 Mapped amenities:', mappedAmenities);
          this.amenities.set(mappedAmenities);
        }
        
        this.loading.set(false);
      },
      error: (error) => {
        console.error('❌ Error loading housing:', error);
        console.error('Error details:', {
          status: error.status,
          message: error.error?.message || error.message,
          url: error.url
        });
        this.loading.set(false);
        
        const errorMsg = error.status === 404 
          ? 'Property not found' 
          : error.error?.message || 'Failed to load property data';
        
        this.showErrorAndNavigate(errorMsg);
      }
    });
  }

  showErrorAndNavigate(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonColor: '#f97316'
    }).then(() => {
      this.router.navigate(['/host/listings']);
    });
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
    const housingId = this.housingId();
    if (!housingId) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Property ID is missing',
        confirmButtonColor: '#f97316'
      });
      return;
    }

    this.submitting.set(true);

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
      latitude: Number(this.latitude()) || 6.2442,
      length: Number(this.longitude()) || -75.5812,
      address: this.address(),
      maxCapacity: Number(this.guests()),
      pricePerNight: Number(this.price()),
      services: this.housingService.mapAmenitiesToServices(this.amenities()),
      imagesUrls: []
    };

    console.log('📤 Updating housing:', housingId, housingData);

    this.housingService.updateHousing(housingId, housingData).subscribe({
      next: (response) => {
        this.submitting.set(false);
        
        Swal.fire({
          icon: 'success',
          title: 'Property Updated!',
          text: 'Your property has been successfully updated',
          confirmButtonColor: '#f97316'
        }).then(() => {
          this.router.navigate(['/host/listings']);
        });
      },
      error: (error) => {
        this.submitting.set(false);
        console.error('❌ Error updating housing:', error);
        
        const errorMsg = error.error?.message || 'Failed to update property. Please try again.';
        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMsg,
          confirmButtonColor: '#f97316'
        });
      }
    });
  }

  cancelEdit() {
    Swal.fire({
      title: 'Cancel Editing?',
      text: 'Any unsaved changes will be lost',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, cancel',
      cancelButtonText: 'Continue editing'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/host/listings']);
      }
    });
  }
}
