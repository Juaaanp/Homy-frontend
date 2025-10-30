import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  featured = [
    { image: '/assets/img1.jpg', name: 'Modern Apartment', city: 'Bogotá', price: 120 },
    { image: '/assets/img2.jpg', name: 'Cozy House', city: 'Medellín', price: 85 },
    { image: '/assets/img3.jpg', name: 'Luxury Villa', city: 'Cartagena', price: 350 },
    { image: '/assets/img4.jpg', name: 'Rustic Cabin', city: 'Pereira', price: 95 },
  ];

  categories = [
    { image: '/assets/beach.jpg', title: 'Beach Houses', subtitle: 'Relax by the sea' },
    { image: '/assets/urban.jpg', title: 'Urban Apartments', subtitle: 'In the heart of the city' },
    { image: '/assets/mountain.jpg', title: 'Mountain Cabins', subtitle: 'Escape to nature' },
  ];
}
