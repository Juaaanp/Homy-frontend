import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sheet-footer',
  standalone: true,
  imports: [CommonModule],
  template: `<ng-content></ng-content>`,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;
      margin-top: auto;
    }
  `]
})
export class SheetFooterComponent {
  @Input() className = '';
}
