import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Heart } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FavoriteService } from '../../services/favorite.service';
import { HousingSummary } from '../../services/housing.service';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, HeaderComponent, FooterComponent],
  templateUrl: './favorites.html',
  styleUrls: ['./favorites.css']
})
export class FavoritesComponent implements OnInit {
  loading = signal(true);
  favorites = signal<HousingSummary[]>([]);
  Heart = Heart;

  constructor(
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.loading.set(true);
    // Backend getUserFavorites returns List<SummaryHousingResponse> directly
    this.favoriteService.getUserFavorites().subscribe({
      next: (favorites) => {
        // Backend already returns the full housing summaries
        this.favorites.set(favorites);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
        this.loading.set(false);
        this.favorites.set([]);
      }
    });
  }

  removeFavorite(housingId: number) {
    this.favoriteService.removeFavorite(housingId).subscribe({
      next: () => {
        // Remover de la lista local
        this.favorites.set(this.favorites().filter(f => f.id !== housingId));
      },
      error: (error) => {
        console.error('Error removing favorite:', error);
      }
    });
  }

  private mapToSummary(housing: any): HousingSummary {
    // Backend SummaryHousingResponse: id, title, city, nightPrice, principalImage, averageRating
    return {
      id: housing.id,
      title: housing.title,
      city: housing.city,
      nightPrice: housing.nightPrice || housing.pricePerNight || 0,
      principalImage: housing.principalImage || housing.imageUrl || null,
      averageRating: housing.averageRating || null,
      // Frontend compatibility fields
      address: housing.address || '',
      pricePerNight: housing.nightPrice || housing.pricePerNight || 0, // Alias
      maxCapacity: housing.maxCapacity || 0,
      imageUrl: housing.principalImage || housing.imageUrl || null // Alias
    };
  }
}

