import { Component, Input, HostBinding, Host } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';

@Component({
  selector: 'app-tabs-trigger',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button
      type="button"
      [class]="getClasses()"
      [attr.data-slot]="'tabs-trigger'"
      [attr.data-state]="isActive ? 'active' : 'inactive'"
      [attr.role]="'tab'"
      [attr.aria-selected]="isActive"
      [disabled]="disabled"
      (click)="onClick()">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      white-space: nowrap;
      border-radius: 0.5rem;
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
      font-weight: 500;
      border: none;
      background: transparent;
      color: rgba(0, 0, 0, 0.65);
      cursor: pointer;
      transition: all 0.2s;
      outline: none;
    }

    button:hover:not(:disabled) {
      background-color: rgba(0, 0, 0, 0.05);
      color: var(--bs-dark);
    }

    button:focus-visible {
      outline: 2px solid var(--bs-primary);
      outline-offset: 2px;
    }

    button[data-state="active"] {
      background-color: white;
      color: var(--bs-dark);
      box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    }

    button:disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    /* Dark mode */
    @media (prefers-color-scheme: dark) {
      button {
        color: rgba(255, 255, 255, 0.65);
      }

      button:hover:not(:disabled) {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
      }

      button[data-state="active"] {
        background-color: rgba(255, 255, 255, 0.1);
        color: white;
      }
    }
  `]
})
export class TabsTriggerComponent {
  @Input() value!: string;
  @Input() disabled = false;
  @Input() className = '';

  constructor(@Host() private tabs: TabsComponent) {}

  get isActive(): boolean {
    return this.tabs.isActive(this.value);
  }

  onClick(): void {
    if (!this.disabled) {
      this.tabs.setActiveTab(this.value);
    }
  }

  getClasses(): string {
    return `tabs-trigger ${this.className}`;
  }
}
