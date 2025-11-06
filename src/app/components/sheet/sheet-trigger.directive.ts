import { Directive, HostListener } from '@angular/core';
import { SheetService } from './sheet.service';

@Directive({
  selector: '[appSheetTrigger]',
  standalone: true
})
export class SheetTriggerDirective {
  constructor(private sheetService: SheetService) {}

  @HostListener('click')
  onClick() {
    this.sheetService.open();
  }
}
