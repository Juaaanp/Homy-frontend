import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { HousingService, HousingSummary } from '../../services/housing.service';
import { TokenService } from '../../services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-listings',
  standalone: true,
  imports: [CommonModule, HeaderComponent, FooterComponent],
  templateUrl: './my-listings.html',
  styleUrls: ['./my-listings.css']
})
export class MyListings implements OnInit {
  listings = signal<HousingSummary[]>([]);
  loading = signal(true);

  constructor(
    private router: Router,
    private housingService: HousingService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    if (!this.tokenService.isLogged()) {
      this.router.navigate(['/login']);
      return;
    }

    if (this.tokenService.getRole() !== 'HOST') {
      Swal.fire({
        icon: 'error',
        title: 'Access Denied',
        text: 'Only HOSTs can view this page',
        confirmButtonColor: '#f97316'
      });
      this.router.navigate(['/']);
      return;
    }

    const userId = this.tokenService.getUserId();
    if (userId) {
      this.loadListings(parseInt(userId));
    }
  }

  loadListings(hostId: number) {
    this.loading.set(true);
    
    this.housingService.getHousingsByHost(hostId, 0, 50).subscribe({
      next: (response) => {
        console.log('✅ Listings loaded:', response.content);
        this.listings.set(response.content);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('❌ Error loading listings:', error);
        this.loading.set(false);
        
        if (error.status === 404) {
          this.listings.set([]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load your listings',
            confirmButtonColor: '#f97316'
          });
        }
      }
    });
  }

  viewListing(id: number) {
    console.log('👁️ View listing:', id);
    this.router.navigate(['/property', id]);
  }

  editListing(id: number) {
    console.log('✏️ Edit listing:', id);
    this.router.navigate(['/host/edit', id]);
  }

  deleteListing(id: number, title: string) {
    console.log('🗑️ Delete listing:', id, title);
    
    Swal.fire({
      title: 'Delete Listing?',
      html: `Are you sure you want to delete <strong>"${title}"</strong>?<br><br>This action cannot be undone.`,
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
              text: 'Your listing has been deleted successfully',
              confirmButtonColor: '#f97316',
              timer: 2000
            });
            
            // Reload listings
            const userId = this.tokenService.getUserId();
            if (userId) {
              this.loadListings(parseInt(userId));
            }
          },
          error: (error) => {
            console.error('❌ Error deleting:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error?.message || 'Failed to delete listing',
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
