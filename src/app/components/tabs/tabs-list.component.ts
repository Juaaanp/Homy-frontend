import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'tabs-list ' + className" data-slot="tabs-list" role="tablist">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tabs-list {
      display: inline-flex;
      height: 2.25rem;
      width: fit-content;
      align-items: center;
      justify-content: center;
      border-radius: 0.75rem;
      background-color: rgba(0, 0, 0, 0.05);
      padding: 3px;
      gap: 2px;
    }
  `],
  host: {
    '[attr.data-slot]': '"tabs-list"'
  }
})
export class TabsListComponent {
  @Input() className = '';
}
