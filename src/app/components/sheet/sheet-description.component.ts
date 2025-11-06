import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sheet-description',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
      color: var(--bs-secondary-color);
      font-size: 0.875rem;
    }
  `]
})
export class SheetDescriptionComponent {
  @Input() className = '';
}
