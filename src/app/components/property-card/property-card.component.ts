import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { BadgeComponent } from '../badge/badge.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-property-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent, BadgeComponent, LucideAngularModule],
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.css']
})
export class PropertyCardComponent {
  @Input() id?: string;
  @Input() title!: string;
  @Input() location!: string;
  @Input() price!: number;
  @Input() rating!: number;
  @Input() reviewCount!: number;
  @Input() imageUrl!: string;
  @Input() isNew = false;
  
  // Para cuando se pase un objeto property completo
  @Input() set property(value: any) {
    if (value) {
      this.id = value.id;
      this.title = value.title;
      this.location = value.location;
      this.price = value.price;
      this.rating = value.rating;
      this.reviewCount = value.reviewCount;
      this.imageUrl = value.imageUrl;
      this.isNew = value.isNew || false;
    }
  }

  constructor(private router: Router) {}

  viewDetails() {
    if (this.id) {
      this.router.navigate(['/explore']);
    }
  }

  bookNow() {
    if (this.id) {
      this.router.navigate(['/booking'], {
        queryParams: { propertyId: this.id }
      });
    }
  }
}
