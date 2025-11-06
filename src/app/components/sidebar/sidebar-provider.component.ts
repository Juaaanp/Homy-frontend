import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-sidebar-provider',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styles: [`
    :host {
      display: flex;
      min-height: 100svh;
      width: 100%;
    }
  `],
  providers: [SidebarService]
})
export class SidebarProviderComponent implements OnInit {
  @Input() defaultOpen = true;
  @Input() className = '';

  constructor(public sidebarService: SidebarService) {}

  ngOnInit() {
    if (!this.defaultOpen) {
      this.sidebarService.setOpen(false);
    }
  }

  @HostBinding('style.--sidebar-width')
  get sidebarWidth() {
    return this.sidebarService.SIDEBAR_WIDTH;
  }

  @HostBinding('style.--sidebar-width-icon')
  get sidebarWidthIcon() {
    return this.sidebarService.SIDEBAR_WIDTH_ICON;
  }

  @HostBinding('class')
  get hostClasses() {
    return ['group/sidebar-wrapper', this.className].filter(Boolean).join(' ');
  }

  @HostBinding('attr.data-slot')
  get dataSlot() {
    return 'sidebar-wrapper';
  }
}
