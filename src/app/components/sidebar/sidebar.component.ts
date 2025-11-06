import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarService } from './sidebar.service';
import {
  SheetContentComponent,
  SheetTitleComponent,
  SheetDescriptionComponent,
  SheetHeaderComponent
} from '../sheet';

type SidebarSide = 'left' | 'right';
type SidebarVariant = 'sidebar' | 'floating' | 'inset';
type SidebarCollapsible = 'offcanvas' | 'icon' | 'none';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    SheetContentComponent,
    SheetTitleComponent,
    SheetDescriptionComponent,
    SheetHeaderComponent
  ],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  @Input() side: SidebarSide = 'left';
  @Input() variant: SidebarVariant = 'sidebar';
  @Input() collapsible: SidebarCollapsible = 'offcanvas';
  @Input() className = '';

  constructor(public sidebarService: SidebarService) {}

  ngOnInit() {}

  get isNonCollapsible() {
    return this.collapsible === 'none';
  }

  get showMobileSheet() {
    return this.sidebarService.isMobile() && !this.isNonCollapsible;
  }

  get showDesktopSidebar() {
    return !this.sidebarService.isMobile() && !this.isNonCollapsible;
  }

  @HostBinding('class')
  get hostClasses() {
    if (this.showDesktopSidebar) {
      return ['group', 'peer', 'text-sidebar-foreground', 'hidden', 'md:block'].join(' ');
    }
    return '';
  }

  @HostBinding('attr.data-state')
  get dataState() {
    return this.showDesktopSidebar ? this.sidebarService.state() : null;
  }

  @HostBinding('attr.data-collapsible')
  get dataCollapsible() {
    return this.showDesktopSidebar && this.sidebarService.state() === 'collapsed' 
      ? this.collapsible 
      : null;
  }

  @HostBinding('attr.data-variant')
  get dataVariant() {
    return this.showDesktopSidebar ? this.variant : null;
  }

  @HostBinding('attr.data-side')
  get dataSide() {
    return this.showDesktopSidebar ? this.side : null;
  }

  @HostBinding('attr.data-slot')
  get dataSlot() {
    return 'sidebar';
  }

  get gapClasses() {
    const baseClasses = 'relative w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear';
    const collapsibleClasses = 'group-data-[collapsible=offcanvas]:w-0';
    const sideClasses = 'group-data-[side=right]:rotate-180';
    
    const variantClasses = this.variant === 'floating' || this.variant === 'inset'
      ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]'
      : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]';

    return [baseClasses, collapsibleClasses, sideClasses, variantClasses].join(' ');
  }

  get containerClasses() {
    const baseClasses = 'fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex';
    
    const sideClasses = this.side === 'left'
      ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
      : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]';

    const variantClasses = this.variant === 'floating' || this.variant === 'inset'
      ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem+2px)]'
      : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l';

    return [baseClasses, sideClasses, variantClasses, this.className].filter(Boolean).join(' ');
  }

  get innerClasses() {
    return 'bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm';
  }

  get nonCollapsibleClasses() {
    return ['bg-sidebar', 'text-sidebar-foreground', 'flex', 'h-full', 'w-[var(--sidebar-width)]', 'flex-col', this.className].filter(Boolean).join(' ');
  }

  closeMobileSidebar() {
    this.sidebarService.setOpenMobile(false);
  }
}
