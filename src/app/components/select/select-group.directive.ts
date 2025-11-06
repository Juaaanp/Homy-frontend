import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'optgroup[appSelectGroup]',
  standalone: true
})
export class SelectGroupDirective {
  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'select-group';
  }

  @HostBinding('class')
  get hostClasses(): string {
    return 'text-muted-foreground';
  }
}
