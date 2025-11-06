
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';

export type Role = 'GUEST' | 'HOST';

function isStrongPassword(pw: string): boolean {
  return /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(pw);
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    HeaderComponent,
    FooterComponent,
    ButtonComponent
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  fullName: string = '';
  email: string = '';
  phone: string = '';
  birthdate: string = '';
  role: Role = 'GUEST';
  password: string = '';
  password2: string = '';
  showPw: boolean = false;
  showPw2: boolean = false;
  agree: boolean = false;

  error: string | null = null;
  success: string | null = null;
  loading: boolean = false;

  constructor(private router: Router) {}

  get passwordStrength(): number {
    if (!this.password) return 0;
    let score = 0;
    if (this.password.length >= 8) score++;
    if (/[A-Z]/.test(this.password)) score++;
    if (/\d/.test(this.password)) score++;
    if (/[^A-Za-z0-9]/.test(this.password)) score++;
    return score;
  }

  validate(): string | null {
    if (!this.fullName.trim()) return 'Por favor, ingresa tu nombre completo.';
    if (!/^\S+@\S+\.\S+$/.test(this.email)) return 'Por favor, ingresa un correo válido.';
    if (!/^[0-9+\-\s()]{7,}$/.test(this.phone)) return 'Por favor, ingresa un número de teléfono válido.';
    if (!this.birthdate) return 'Selecciona tu fecha de nacimiento.';
    if (!isStrongPassword(this.password)) return 'La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.';
    if (this.password !== this.password2) return 'Las contraseñas no coinciden.';
    if (!this.agree) return 'Debes aceptar los términos y condiciones.';
    return null;
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    const err = this.validate();
    if (err) {
      this.error = err;
      this.success = null;
      return;
    }
    this.loading = true;
    // Simulación de llamada a backend
    setTimeout(() => {
      this.loading = false;
      this.error = null;
      this.success = 'Cuenta creada correctamente. Redirigiendo al inicio...';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    }, 1500);
  }

  navigateToLogin(): void {
    if (!this.loading) {
      this.router.navigate(['/login']);
    }
  }

  togglePasswordVisibility(): void {
    this.showPw = !this.showPw;
  }

  togglePassword2Visibility(): void {
    this.showPw2 = !this.showPw2;
  }
}
