import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { UserService, User } from '../../services/user.service';

type TabSection = 'profile' | 'preferences' | 'security';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, HeaderComponent, FooterComponent, ButtonComponent],
  templateUrl: './user-profile.html',
  styleUrls: ['./user-profile.css']
})
export class UserProfile implements OnInit {
  loading = signal(true);
  saving = signal(false);
  user = signal<User | null>(null);
  activeTab = signal<TabSection>('profile');
  
  // Edit mode flags
  editingProfile = signal(false);
  editingAddress = signal(false);
  
  // Password change
  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');
  passwordError = signal<string | null>(null);
  passwordSuccess = signal(false);

  // Temp edit values
  editFullName = '';
  editPhone = '';
  editBio = '';
  editStreet = '';
  editCity = '';
  editCountry = '';
  editPostalCode = '';

  constructor(
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.loading.set(true);
    this.userService.getCurrentUser().subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: (err) => {
        console.error('Error loading user:', err);
        this.loading.set(false);
      }
    });
  }

  setTab(tab: TabSection) {
    this.activeTab.set(tab);
  }

  startEditProfile(): void {
    const u = this.user();
    if (!u) return;
    this.editFullName = u.name || u.fullName || '';
    this.editPhone = u.phone;
    this.editBio = u.bio ?? '';
    this.editingProfile.set(true);
  }

  cancelEditProfile() {
    this.editingProfile.set(false);
  }

  saveProfile() {
    if (!this.editFullName.trim() || !this.editPhone.trim()) {
      this.passwordError.set('Name and phone are required');
      return;
    }

    // Validate phone format (7-15 digits)
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phoneRegex.test(this.editPhone.replace(/\s+/g, ''))) {
      this.passwordError.set('Phone must be 7-15 digits');
      return;
    }

    this.saving.set(true);
    this.passwordError.set(null);

    const updates = {
      name: this.editFullName.trim(),
      phoneNumber: this.editPhone.replace(/\s+/g, '')
    };
    
    this.userService.updateProfile(updates).subscribe({
      next: (updated) => {
        this.user.set(updated);
        this.editingProfile.set(false);
        this.saving.set(false);
        this.passwordSuccess.set(true);
        setTimeout(() => this.passwordSuccess.set(false), 3000);
      },
      error: (err) => {
        console.error('Error updating profile:', err);
        this.passwordError.set(err.error?.message || 'Error updating profile');
        this.saving.set(false);
      }
    });
  }

  startEditAddress() {
    const u = this.user();
    if (!u) return;
    this.editStreet = u.address?.street ?? '';
    this.editCity = u.address?.city ?? '';
    this.editCountry = u.address?.country ?? '';
    this.editPostalCode = u.address?.postalCode ?? '';
    this.editingAddress.set(true);
  }

  cancelEditAddress() {
    this.editingAddress.set(false);
  }

  saveAddress() {
    // Address update not yet supported in backend
    this.passwordError.set('Address updates are not yet available');
    this.editingAddress.set(false);
    
    // TODO: Implement when backend supports address updates
    /*
    this.saving.set(true);
    const updates = {
      address: {
        street: this.editStreet,
        city: this.editCity,
        country: this.editCountry,
        postalCode: this.editPostalCode
      }
    };
    
    this.userService.updateProfile(updates).subscribe({
      next: (updated) => {
        this.user.set(updated);
        this.editingAddress.set(false);
        this.saving.set(false);
      },
      error: (err) => {
        console.error('Error updating address:', err);
        this.saving.set(false);
      }
    });
    */
  }

  toggleNotification(type: 'email' | 'sms' | 'push') {
    const u = this.user();
    if (!u || !u.preferences) return;
    
    const newPrefs = { ...u.preferences.notifications };
    newPrefs[type] = !newPrefs[type];
    
    this.userService.updateNotificationPreferences(newPrefs).subscribe({
      next: () => {
        const updated = { ...u };
        updated.preferences!.notifications = newPrefs;
        this.user.set(updated);
      }
    });
  }

  changePassword() {
    this.passwordError.set(null);
    this.passwordSuccess.set(false);

    if (!this.currentPassword() || !this.newPassword() || !this.confirmPassword()) {
      this.passwordError.set('All fields are required');
      return;
    }

    if (this.newPassword().length < 8) {
      this.passwordError.set('New password must be at least 8 characters');
      return;
    }

    if (this.newPassword() !== this.confirmPassword()) {
      this.passwordError.set('Passwords do not match');
      return;
    }

    this.saving.set(true);
    this.userService.updatePassword(this.currentPassword(), this.newPassword()).subscribe({
      next: () => {
        this.passwordSuccess.set(true);
        this.currentPassword.set('');
        this.newPassword.set('');
        this.confirmPassword.set('');
        this.saving.set(false);
      },
      error: (err) => {
        // Display specific error message from service
        this.passwordError.set(err.message || 'Error al cambiar la contraseña');
        this.saving.set(false);
      }
    });
  }

  formatDate(dateStr: string | undefined): string {
    if (!dateStr) return 'Unknown';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }

  navigateToBookings() {
    this.router.navigate(['/bookings']);
  }

  navigateToListings() {
    this.router.navigate(['/host/list']);
  }
}
