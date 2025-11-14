import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule, Edit, Trash2, Eye, Plus, Loader2, Home, MapPin, Users, DollarSign, BarChart3 } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HousingService, HousingSummary } from '../../services/housing.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-listings',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule, HeaderComponent, FooterComponent],
  templateUrl: './my-listings.html',
  styleUrls: ['./my-listings.css']
})
export class MyListings implements OnInit {
  listings = signal<HousingSummary[]>([]);
  loading = signal(true);
  hostId = signal<number | null>(null);
  
  // Icons
  Edit = Edit;
  Trash2 = Trash2;
  Eye = Eye;
  Plus = Plus;
  Loader2 = Loader2;
  Home = Home;
  MapPin = MapPin;
  Users = Users;
  DollarSign = DollarSign;
  BarChart3 = BarChart3;
  
  // Metrics
  showingMetrics = signal<number | null>(null);
  metrics = signal<any>(null);
  loadingMetrics = signal(false);

  constructor(
    private router: Router,
    private housingService: HousingService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    // Check if user is HOST
    if (!this.tokenService.isLogged()) {
      Swal.fire({
        icon: 'warning',
        title: 'Authentication Required',
        text: 'Please login to view your listings',
        confirmButtonColor: '#f97316'
      }).then(() => {
        this.router.navigate(['/login']);
      });
      return;
    }

    const role = this.tokenService.getRole();
    if (role !== 'HOST') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Only HOSTs can view listings',
        confirmButtonColor: '#f97316'
      }).then(() => {
        this.router.navigate(['/']);
      });
      return;
    }

    const userId = this.tokenService.getUserId();
    if (userId) {
      const numericId = parseInt(userId);
      this.hostId.set(numericId);
      this.loadListings(numericId);
    }
  }

  loadListings(hostId: number) {
    this.housingService.getHousingsByHost(hostId, 0, 50).subscribe({
      next: (response) => {
        // Mapear la respuesta del backend al formato esperado
        const mappedListings = response.content.map((item: any) => ({
          id: item.id,
          title: item.title,
          city: item.city,
          address: item.address || '', // El backend puede no devolver address
          pricePerNight: item.nightPrice || item.pricePerNight,
          maxCapacity: item.maxCapacity || 0, // El backend puede no devolver maxCapacity
          imageUrl: item.principalImage || item.imageUrl || null
        }));
        this.listings.set(mappedListings);
        this.loading.set(false);
        
        // Show info if no listings yet
        if (response.content.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'No listings yet',
            html: 'You haven\'t created any properties yet.<br><br>Note: The backend endpoint <code>GET /housings/host/{hostId}</code> needs to be implemented to show your listings here.',
            confirmButtonColor: '#f97316',
            confirmButtonText: 'Create First Listing'
          }).then((result) => {
            if (result.isConfirmed) {
              this.createNewListing();
            }
          });
        }
      },
      error: (error) => {
        console.error('Error loading listings:', error);
        this.loading.set(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load your listings',
          confirmButtonColor: '#f97316'
        });
      }
    });
  }

  viewListing(id: number) {
    this.router.navigate(['/property', id]);
  }

  editListing(id: number) {
    // Navigate to edit page with housing ID
    this.router.navigate(['/host/list'], {
      queryParams: { edit: id }
    });
  }

  deleteListing(id: number, title: string) {
    Swal.fire({
      title: 'Delete Listing?',
      text: `Are you sure you want to delete "${title}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.housingService.deleteHousing(id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'Your listing has been deleted',
              confirmButtonColor: '#f97316'
            });
            // Reload listings
            const hostId = this.hostId();
            if (hostId) {
              this.loadListings(hostId);
            }
          },
          error: (error) => {
            console.error('Error deleting listing:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Failed to delete listing',
              confirmButtonColor: '#f97316'
            });
          }
        });
      }
    });
  }

  createNewListing() {
    this.router.navigate(['/host/list']);
  }

  showMetrics(housingId: number) {
    // Validar que el ID sea válido
    if (!housingId || isNaN(housingId)) {
      console.error('Invalid housing ID:', housingId);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'ID de alojamiento inválido',
        confirmButtonColor: '#f97316'
      });
      return;
    }
    
    console.log('Loading metrics for housing ID:', housingId);
    this.showingMetrics.set(housingId);
    this.loadingMetrics.set(true);
    
    this.housingService.getHousingMetrics(housingId).subscribe({
      next: (data) => {
        this.metrics.set(data);
        this.loadingMetrics.set(false);
        
        Swal.fire({
          icon: 'info',
          title: `Métricas: ${data.housingTitle || 'Alojamiento'}`,
          html: `
            <div style="text-align: left; margin-top: 20px;">
              <div style="margin-bottom: 15px;">
                <strong>Total de Reservas:</strong> ${data.totalBookings || 0}
              </div>
              <div style="margin-bottom: 15px;">
                <strong>Calificación Promedio:</strong> 
                ${data.averageRating ? data.averageRating.toFixed(1) : 'N/A'} ⭐
              </div>
              ${data.dateFrom ? `<div><strong>Desde:</strong> ${data.dateFrom}</div>` : ''}
              ${data.dateTo ? `<div><strong>Hasta:</strong> ${data.dateTo}</div>` : ''}
            </div>
          `,
          confirmButtonColor: '#f97316',
          width: '500px'
        });
      },
      error: (error) => {
        console.error('Error loading metrics:', error);
        this.loadingMetrics.set(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar las métricas',
          confirmButtonColor: '#f97316'
        });
      }
    });
  }

  closeMetrics() {
    this.showingMetrics.set(null);
    this.metrics.set(null);
  }
}
