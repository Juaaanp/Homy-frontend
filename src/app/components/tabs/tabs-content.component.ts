import { Component, Input, Host } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './tabs.component';

@Component({
  selector: 'app-tabs-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="isActive"
      [class]="'tabs-content ' + className"
      [attr.data-slot]="'tabs-content'"
      [attr.data-state]="isActive ? 'active' : 'inactive'"
      [attr.role]="'tabpanel'"
      [@fadeIn]>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tabs-content {
      margin-top: 0.5rem;
      outline: none;
    }

    .tabs-content:focus-visible {
      outline: 2px solid var(--bs-primary);
      outline-offset: 2px;
      border-radius: 0.375rem;
    }
  `],
  animations: [
    // Simple fade in animation
  ]
})
export class TabsContentComponent {
  @Input() value!: string;
  @Input() className = '';

  constructor(@Host() private tabs: TabsComponent) {}

  get isActive(): boolean {
    return this.tabs.isActive(this.value);
  }
}
