import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
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
        this.listings.set(response.content);
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
    // TODO: Implement edit functionality
    Swal.fire({
      icon: 'info',
      title: 'Coming Soon',
      text: 'Edit functionality will be available soon',
      confirmButtonColor: '#f97316'
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
}
