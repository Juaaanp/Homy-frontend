import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { LucideAngularModule } from 'lucide-angular';
import { PropertyService, Property } from '../../services/property.service';

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [CommonModule, PropertyCardComponent, LucideAngularModule],
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.css']
})
export class FeaturedPropertiesComponent implements OnInit {
  featuredProperties: Property[] = [];

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) {}

  ngOnInit() {
    // Load featured properties from service
    this.propertyService.getFeaturedProperties().subscribe({
      next: (properties) => {
        console.log('Featured properties loaded:', properties);
        this.featuredProperties = properties.filter(p => p && p.id && p.title);
      }
    });
  }

  scrollLeft() {
    const grid = document.querySelector('.featured-grid') as HTMLElement;
    if (grid) {
      grid.scrollBy({ left: -400, behavior: 'smooth' });
    }
  }

  scrollRight() {
    const grid = document.querySelector('.featured-grid') as HTMLElement;
    if (grid) {
      grid.scrollBy({ left: 400, behavior: 'smooth' });
    }
  }
}
