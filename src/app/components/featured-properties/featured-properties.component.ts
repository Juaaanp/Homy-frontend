import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { LucideAngularModule } from 'lucide-angular';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isNew?: boolean;
}

@Component({
  selector: 'app-featured-properties',
  standalone: true,
  imports: [CommonModule, ButtonComponent, PropertyCardComponent, LucideAngularModule],
  templateUrl: './featured-properties.component.html',
  styleUrls: ['./featured-properties.component.css']
})
export class FeaturedPropertiesComponent {
  featuredProperties: Property[] = [
    {
      id: '1',
      title: 'Modern Apartment in Zona Rosa',
  location: 'Bogota, Colombia',
      price: 120000,
      rating: 4.8,
      reviewCount: 127,
      imageUrl: 'https://images.unsplash.com/photo-1662454419622-a41092ecd245?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1NjI4NTg1Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isNew: true
    },
    {
      id: '2',
      title: 'Cozy House with Garden',
  location: 'Medellin, Colombia',
      price: 85000,
      rating: 4.9,
      reviewCount: 89,
      imageUrl: 'https://images.unsplash.com/photo-1641243418336-502b640ea5f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaG91c2UlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTYzOTM5Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '3',
      title: 'Luxury Villa with Pool',
  location: 'Cartagena, Colombia',
      price: 350000,
      rating: 5.0,
      reviewCount: 45,
      imageUrl: 'https://images.unsplash.com/photo-1728050829115-490e7a27ad81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB2aWxsYSUyMHBvb2x8ZW58MXx8fHwxNzU2MzUzMjgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    },
    {
      id: '4',
      title: 'Rustic Cabin in the Mountains',
  location: 'Coffee Region, Colombia',
      price: 95000,
      rating: 4.7,
      reviewCount: 156,
      imageUrl: 'https://images.unsplash.com/photo-1633622673868-6eebc8f2573f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0aWMlMjBjYWJpbiUyMG1vdW50YWluc3xlbnwxfHx8fDE3NTYzOTM5Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    }
  ];
}
