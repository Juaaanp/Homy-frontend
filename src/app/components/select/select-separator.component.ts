import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-select-separator',
  standalone: true,
  imports: [CommonModule],
  template: `<hr class="bg-border pointer-events-none -mx-1 my-1 h-px border-0" />`,
  styles: [`
    :host {
      display: block;
    }
    
    .bg-border {
      background-color: var(--bs-border-color);
    }
    
    .pointer-events-none {
      pointer-events: none;
    }
    
    .-mx-1 {
      margin-left: -0.25rem;
      margin-right: -0.25rem;
    }
    
    .my-1 {
      margin-top: 0.25rem;
      margin-bottom: 0.25rem;
    }
    
    .h-px {
      height: 1px;
    }
  `]
})
export class SelectSeparatorComponent {}
