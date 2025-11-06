import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: '<div [class]="getClasses()" [attr.data-slot]="\'skeleton\'"></div>',
  styleUrls: ['./skeleton.component.css'],
  host: {
    '[attr.data-slot]': '"skeleton"'
  }
})
export class SkeletonComponent {
  @Input() className = '';

  getClasses(): string {
    const baseClasses = 'skeleton-base';
    return this.className ? `${baseClasses} ${this.className}` : baseClasses;
  }
}
