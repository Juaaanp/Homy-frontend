import { Directive, HostListener, Optional } from '@angular/core';
import { CollapsibleComponent } from './collapsible.component';

@Directive({
  selector: '[collapsibleTrigger]'
})
export class CollapsibleTriggerDirective {
  constructor(@Optional() private parent: CollapsibleComponent) {}

  @HostListener('click')
  onClick() {
    if (!this.parent) return;
    this.parent.toggle();
  }
}
