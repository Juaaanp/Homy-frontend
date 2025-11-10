import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  ],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  email = '';
  loading = false;
  error: string | null = null;
  success: string | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(event: Event): void {
    event.preventDefault();
    this.error = null;
    this.success = null;

    // Email validation
    if (!/^\S+@\S+\.\S+$/.test(this.email)) {
      this.error = 'Please enter a valid email address.';
      return;
    }

    this.loading = true;

    // Llamar al backend para solicitar reset de contraseña
    this.authService.requestPasswordReset(this.email).subscribe({
      next: (response) => {
        this.loading = false;
        // Backend devuelve Map.of("message", "...") en caso de éxito
        Swal.fire({
          icon: 'success',
          title: 'Código enviado',
          text: 'Se ha enviado un código de recuperación a tu correo electrónico.',
          confirmButtonColor: '#F97316'
        });
        this.success = 'Password reset code sent to your email.';
        // Navegar a verify-code con el email
        this.router.navigate(['/verify-code'], { queryParams: { email: this.email } });
      },
      error: (error) => {
        this.loading = false;
        console.error('Error requesting password reset:', error);
        const errorMsg = error.error?.message || 'Error al enviar el email de recuperación.';
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
    if (!this.loading) {
      this.router.navigate(['/login']);
    }
  }
}
