import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { ButtonComponent } from '../../components/button/button.component';

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
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  remember: boolean = true;
  error: string | null = null;
  loading: boolean = false;

  constructor(private router: Router) {}

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

    // Mock API call
    const payload = { 
      email: this.email, 
      password: this.password, 
      remember: this.remember 
    };
    console.log('LOGIN PAYLOAD', payload);

    // Simular llamada API
    setTimeout(() => {
      this.loading = false;
      // Simular login exitoso
      this.router.navigate(['/']);
    }, 1500);
  }

  navigateToRegister(): void {
    if (!this.loading) {
      this.router.navigate(['/register']);
    }
  }
}
