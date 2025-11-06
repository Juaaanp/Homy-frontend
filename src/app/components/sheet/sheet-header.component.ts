import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sheet-header',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.375rem;
      padding: 1rem;
    }
  `]
})
export class SheetHeaderComponent {
  @Input() className = '';
}
