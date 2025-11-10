import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { LucideAngularModule } from 'lucide-angular';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  private tokenService = inject(TokenService);
  
  constructor(private router: Router) {}

  get isLoggedIn(): boolean {
    return this.tokenService.isLogged();
  }

  get userEmail(): string {
    return this.tokenService.getEmail();
  }

  get isHost(): boolean {
    return this.tokenService.getRole() === 'HOST';
  }

  logout(): void {
    this.tokenService.logout();
    this.router.navigate(['/']);
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    const url = this.router.url || '/';
    if (path === '/') {
      return url === '/';
    }
    return url.startsWith(path);
  }
}
