import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Heart } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FavoriteService } from '../../services/favorite.service';
import { HousingService, HousingSummary } from '../../services/housing.service';

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
    private favoriteService: FavoriteService,
    private housingService: HousingService
  ) {}

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.loading.set(true);
    this.favoriteService.getUserFavorites().subscribe({
      next: (housingIds) => {
        if (housingIds.length === 0) {
          this.favorites.set([]);
          this.loading.set(false);
          return;
        }

        // Cargar detalles de cada alojamiento favorito
        const requests = housingIds.map(id => 
          this.housingService.getHousingById(id)
        );

        Promise.all(requests.map(req => req.toPromise())).then(results => {
          const housings = results
            .filter(h => h !== undefined)
            .map(h => this.mapToSummary(h));
          this.favorites.set(housings);
          this.loading.set(false);
        }).catch(error => {
          console.error('Error loading favorite properties:', error);
          this.loading.set(false);
        });
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
        this.loading.set(false);
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
    return {
      id: housing.id,
      title: housing.title,
      city: housing.city,
      address: housing.address,
      pricePerNight: housing.pricePerNight,
      maxCapacity: housing.maxCapacity,
      imageUrl: housing.images?.[0]?.url || null
    };
  }
}

