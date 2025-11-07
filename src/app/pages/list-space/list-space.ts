import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';

// Minimal host "List your space" wizard (frontend-only mock)
// Steps: 1 Basic -> 2 Location -> 3 Pricing -> 4 Photos -> 5 Amenities -> 6 Review

type Step = 1 | 2 | 3 | 4 | 5 | 6;

@Component({
  selector: 'app-list-space',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, HeaderComponent, FooterComponent, ButtonComponent],
  templateUrl: './list-space.html',
  styleUrls: ['./list-space.css']
})
export class ListSpace {
  step = signal<Step>(1);
  submitting = signal(false);
  submitted = signal(false);

  // Form state
  title = signal('');
  type = signal('Apartment');
  guests = signal(2);
  bedrooms = signal(1);
  bathrooms = signal(1);

  country = signal('Colombia');
  city = signal('');
  address = signal('');

  price = signal(180);

  photoUrl = signal('');
  photos = signal<string[]>([]);

  amenityOptions = ['WiFi','Kitchen','Air Conditioning','Parking','Washer','Pool','TV','Heating','Pet Friendly'];
  amenities = signal<string[]>([]);

  // Derived
  validBasic = computed(() => this.title().trim().length >= 6 && this.guests() >= 1);
  validLocation = computed(() => this.city().trim().length >= 2 && this.address().trim().length >= 6);
  validPricing = computed(() => this.price() > 0);
  validPhotos = computed(() => this.photos().length >= 1);

  constructor(private router: Router) {}

  addPhoto() {
    const url = this.photoUrl().trim();
    if (!url) return;
    this.photos.set([ ...this.photos(), url ]);
    this.photoUrl.set('');
  }

  removePhoto(i: number) {
    const arr = [...this.photos()];
    arr.splice(i,1);
    this.photos.set(arr);
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
    if (this.step() === 4 && !this.validPhotos()) return;
    this.step.set((this.step() + 1) as Step);
  }

  back() {
    this.step.set((this.step() - 1) as Step);
  }

  submit() {
    // Mock submit - ready to replace by backend call later
    this.submitting.set(true);
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
    }, 800);
  }

  goHome() {
    this.router.navigate(['/']);
  }
}
