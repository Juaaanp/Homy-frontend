import { Directive, HostListener } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Directive({
  selector: '[appSidebarTrigger]',
  standalone: true,
  host: {
    '[attr.data-sidebar]': '"trigger"',
    '[attr.data-slot]': '"sidebar-trigger"'
  }
})
export class SidebarTriggerDirective {
  constructor(private sidebarService: SidebarService) {}

  @HostListener('click')
  onClick() {
    this.sidebarService.toggleSidebar();
  }
}
