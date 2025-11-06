import { Directive, HostListener } from '@angular/core';
import { SheetService } from './sheet.service';

@Directive({
  selector: '[appSheetClose]',
  standalone: true
})
export class SheetCloseDirective {
  constructor(private sheetService: SheetService) {}

  @HostListener('click')
  onClick() {
    this.sheetService.close();
  }
}
