import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

interface Category {
  id: string;
  name: string;
  description: string;
  count: string;
  color: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories: Category[] = [
    {
      id: 'apartments',
      name: 'Apartamentos',
        description: 'Modern apartments in the city',
      count: '200+',
      color: 'bg-blue-50 text-blue-600'
    },
    {
      id: 'houses',
      name: 'Casas',
        description: 'Entire homes for families',
      count: '150+',
      color: 'bg-green-50 text-green-600'
    },
    {
      id: 'villas',
      name: 'Villas',
      description: 'Lujosas propiedades privadas',
      count: '50+',
      color: 'bg-purple-50 text-purple-600'
    },
    {
      id: 'cabins',
        name: 'Cabins',
      description: 'Escapadas en la naturaleza',
      count: '80+',
      color: 'bg-orange-50 text-orange-600'
    },
    {
      id: 'beachfront',
      name: 'Frente al mar',
        description: 'Spectacular ocean views',
      count: '60+',
      color: 'bg-cyan-50 text-cyan-600'
    },
    {
      id: 'mountain',
        name: 'Mountain',
      description: 'Refugios en las alturas',
      count: '40+',
      color: 'bg-gray-50 text-gray-600'
    }
  ];

  constructor(private router: Router) {}

  handleCategoryClick(categoryId: string) {
    this.router.navigate(['/explore'], {
      state: { category: categoryId }
    });
  }
}
