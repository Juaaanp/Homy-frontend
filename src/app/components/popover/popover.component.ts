import { Component, Input, Output, EventEmitter, TemplateRef, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      display: contents;
    }
  `]
})
export class PopoverComponent {
  @Input() open: boolean = false;
  @Output() openChange = new EventEmitter<boolean>();

  toggleOpen(value: boolean) {
    this.open = value;
    this.openChange.emit(value);
  }
}