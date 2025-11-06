import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'tabs-root ' + className" data-slot="tabs">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .tabs-root {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `],
  host: {
    '[attr.data-slot]': '"tabs"'
  }
})
export class TabsComponent {
  @Input() defaultValue?: string;
  @Input() value?: string;
  @Input() className = '';
  @Output() valueChange = new EventEmitter<string>();

  activeTab: string = '';

  ngOnInit(): void {
    this.activeTab = this.value || this.defaultValue || '';
  }

  ngOnChanges(): void {
    if (this.value !== undefined) {
      this.activeTab = this.value;
    }
  }

  setActiveTab(value: string): void {
    this.activeTab = value;
    this.valueChange.emit(value);
  }

  isActive(value: string): boolean {
    return this.activeTab === value;
  }
}
