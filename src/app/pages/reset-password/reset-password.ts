import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  ],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.css'
})
export class ResetPassword implements OnInit {
  email = '';
  code = '';
  password = '';
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;
  loading = false;
  error: string | null = null;
  success = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get email and code from query params (vienen de verify-code)
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      this.code = params['code'] || '';
      
      // Si no hay email o código, redirigir a forgot-password
      if (!this.email || !this.code) {
        this.router.navigate(['/forgot-password']);
      }
    });
  }

  get passwordStrength(): number {
    if (!this.password) return 0;
    let score = 0;
    if (this.password.length >= 8) score++;
    if (/[A-Z]/.test(this.password)) score++;
    if (/\d/.test(this.password)) score++;
    if (/[^A-Za-z0-9]/.test(this.password)) score++;
    return score;
  }

  get passwordsMatch(): boolean {
    return this.password === this.confirmPassword && this.confirmPassword.length > 0;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.error = null;

    // Validate password
    if (this.password.length < 8) {
      this.error = 'Password must be at least 8 characters long.';
      return;
    }

    if (!/(?=.*[A-Z])(?=.*\d)/.test(this.password)) {
      this.error = 'Password must contain at least one uppercase letter and one number.';
      return;
    }

    // Validate passwords match
    if (this.password !== this.confirmPassword) {
      this.error = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    // Llamar al backend para confirmar el cambio de contraseña
    this.authService.confirmPasswordReset(this.email, this.code, this.password).subscribe({
      next: (response) => {
        this.loading = false;
        this.success = true;
        
        Swal.fire({
          icon: 'success',
          title: 'Contraseña restablecida',
          text: 'Tu contraseña ha sido cambiada exitosamente.',
          confirmButtonColor: '#F97316'
        }).then(() => {
          // Redirect to login
          this.router.navigate(['/login']);
        });
      },
      error: (error) => {
        this.loading = false;
        console.error('Error resetting password:', error);
        const errorMsg = error.error || 'Error al restablecer la contraseña.';
        this.error = errorMsg;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMsg,
          confirmButtonColor: '#F97316'
        });
      }
    });
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  requestNewLink(): void {
    this.router.navigate(['/forgot-password']);
  }
}
