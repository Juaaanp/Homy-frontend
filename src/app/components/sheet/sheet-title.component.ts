import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sheet-title',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: block;
      color: var(--bs-body-color);
      font-weight: 600;
      font-size: 1.125rem;
    }
  `]
})
export class SheetTitleComponent {
  @Input() className = '';
}
