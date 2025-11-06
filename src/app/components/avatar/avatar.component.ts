import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent {
  /** Image source. If not provided, shows fallback slot */
  @Input() src?: string | null;
  @Input() alt = '';

  /** size in px (number) or string (e.g. '40px') */
  @Input() size: number | string = 40;

  getSizeValue(): string {
    if (typeof this.size === 'number') return `${this.size}px`;
    return this.size || '40px';
  }
}
