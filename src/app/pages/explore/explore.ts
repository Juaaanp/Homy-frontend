import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { PropertyService, Property } from '../../services/property.service';

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
  
  properties: Property[] = [];
  
  constructor(
    private router: Router,
    private propertyService: PropertyService
  ) {}

  ngOnInit() {
    // Load properties from service
    this.propertyService.getAllProperties().subscribe({
      next: (properties) => {
        this.properties = properties;
      }
    });
  }
  
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
