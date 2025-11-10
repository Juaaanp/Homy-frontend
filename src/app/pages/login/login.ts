import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { LoginDTO } from '../../models/login-dto';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  remember: boolean = true;
  error: string | null = null;
  loading: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.error = null;

  // Email validation
    if (!/^\S+@\S+\.\S+$/.test(this.email)) {
  this.error = 'Please enter a valid email address.';
      return;
    }

  // Password validation
    if (!this.password.trim()) {
  this.error = 'Please enter your password.';
      return;
    }

    this.loading = true;

    // Crear LoginDTO con los datos del formulario
    const loginDTO: LoginDTO = {
      email: this.email,
      password: this.password
    };

    // Llamar al servicio de autenticación
    this.authService.login(loginDTO).subscribe({
      next: (data: any) => {
        console.log('Login response:', data); // Debug
        // El backend devuelve { accessToken: "..." } directamente
        const token = data.accessToken || data.content?.token;
        if (token) {
          this.tokenService.login(token);
          this.loading = false;
          
          // Redirigir al inicio (sin reload para mantener el estado)
          this.router.navigate(['/']);
        } else {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se recibió el token de autenticación'
          });
        }
      },
      error: (error) => {
        this.loading = false;
        const errorMessage = error.error?.message || error.error?.content || error.message || 'Error al iniciar sesión';
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage
        });
      }
    });
  }

  navigateToRegister(): void {
    if (!this.loading) {
      this.router.navigate(['/register']);
    }
  }

  navigateToForgotPassword(): void {
    if (!this.loading) {
      this.router.navigate(['/forgot-password']);
    }
  }
}
