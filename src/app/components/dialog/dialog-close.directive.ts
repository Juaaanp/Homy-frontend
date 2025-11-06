import { Directive, HostListener } from '@angular/core';
import { DialogService } from './dialog.service';

@Directive({ selector: '[dialogClose]' })
export class DialogCloseDirective {
  constructor(private svc: DialogService) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    this.svc.close();
  }
}
