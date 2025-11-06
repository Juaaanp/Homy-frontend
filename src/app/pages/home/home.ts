import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FeaturedPropertiesComponent } from '../../components/featured-properties/featured-properties.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';

interface SearchParams {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    LucideAngularModule,
    HeaderComponent, 
    FeaturedPropertiesComponent, 
    CategoriesComponent, 
    FooterComponent,
    ButtonComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  searchParams: SearchParams = {
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 2
  };

  activeField: string | null = null;

  popularDestinations = [
  'Medellin', 'Cartagena', 'Bogota', 'Cali', 'Santa Marta', 'San Andres'
  ];

  constructor(private router: Router) {}

  handleSearch() {
    if (!this.searchParams.location.trim()) {
      this.activeField = 'location';
      return;
    }
    
    this.router.navigate(['/explore'], { 
      state: { 
        search: this.searchParams 
      } 
    });
  }

  handleKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }

  setActiveField(field: string | null) {
    this.activeField = field;
  }

  selectDestination(destination: string) {
    this.searchParams.location = destination;
    this.activeField = null;
  }

  formatDisplayDate(dateString: string): string {
    if (!dateString) return 'Agregar fecha';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  }

  getCheckoutMinDate(): string {
    return this.searchParams.checkIn || new Date().toISOString().split('T')[0];
  }

  getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }

  updateCheckIn(value: string) {
    this.searchParams.checkIn = value;
    this.activeField = 'checkOut';
  }

  updateCheckOut(value: string) {
    this.searchParams.checkOut = value;
    this.activeField = 'guests';
  }

  decrementGuests() {
    this.searchParams.guests = Math.max(1, this.searchParams.guests - 1);
  }

  incrementGuests() {
    this.searchParams.guests = Math.min(16, this.searchParams.guests + 1);
  }

  navigateToExplore() {
    this.router.navigate(['/explore']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
