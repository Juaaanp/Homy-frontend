import { Component, OnInit } from '@angular/core';
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
  selector: 'app-verify-code',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  ],
  templateUrl: './verify-code.html',
  styleUrl: './verify-code.css'
})
export class VerifyCode implements OnInit {
  email = '';
  code = '';
  loading = false;
  error: string | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Get email from query params (viene de forgot-password)
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      if (!this.email) {
        // Si no hay email, redirigir a forgot-password
        this.router.navigate(['/forgot-password']);
      }
    });
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.error = null;

    // Validar que el código no esté vacío
    if (!this.code || this.code.length < 6) {
      this.error = 'Please enter a valid 6-digit code.';
      return;
    }

    this.loading = true;

    // Verificar el código con el backend
    this.authService.verifyResetCode(this.email, this.code).subscribe({
      next: (response) => {
        this.loading = false;
        
        Swal.fire({
          icon: 'success',
          title: 'Código verificado',
          text: 'El código es válido. Ahora puedes cambiar tu contraseña.',
          confirmButtonColor: '#F97316',
          timer: 2000
        });

        // Navegar a reset-password con email y código
        this.router.navigate(['/reset-password'], { 
          queryParams: { 
            email: this.email,
            code: this.code 
          } 
        });
      },
      error: (error) => {
        this.loading = false;
        console.error('Error verifying code:', error);
        const errorMsg = error.error?.message || error.error || 'Código inválido o expirado.';
        this.error = errorMsg;
        Swal.fire({
          icon: 'error',
          title: 'Código inválido',
          text: errorMsg,
          confirmButtonColor: '#F97316'
        });
      }
    });
  }

  resendCode(): void {
    if (!this.email) return;

    this.loading = true;
    this.authService.requestPasswordReset(this.email).subscribe({
      next: (response) => {
        this.loading = false;
        Swal.fire({
          icon: 'success',
          title: 'Código reenviado',
          text: 'Se ha enviado un nuevo código a tu correo.',
          confirmButtonColor: '#F97316'
        });
      },
      error: (error) => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo reenviar el código. Intenta de nuevo.',
          confirmButtonColor: '#F97316'
        });
      }
    });
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
