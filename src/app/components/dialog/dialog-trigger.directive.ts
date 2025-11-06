import { Directive, HostListener } from '@angular/core';
import { DialogService } from './dialog.service';

@Directive({
  selector: '[dialogTrigger]'
})
export class DialogTriggerDirective {
  constructor(private svc: DialogService) {}

  @HostListener('click', ['$event'])
  onClick(event: Event) {
    event.preventDefault();
    this.svc.open();
  }
}
