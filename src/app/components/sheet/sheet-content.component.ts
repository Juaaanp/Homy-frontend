import { Component, Input, HostBinding, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheetService } from './sheet.service';
import { SheetCloseDirective } from './sheet-close.directive';
import { Subscription } from 'rxjs';

type SheetSide = 'top' | 'right' | 'bottom' | 'left';

@Component({
  selector: 'app-sheet-content',
  standalone: true,
  imports: [CommonModule, SheetCloseDirective],
  templateUrl: './sheet-content.component.html',
  styleUrls: ['./sheet-content.component.css']
})
export class SheetContentComponent implements OnInit, OnDestroy {
  @Input() side: SheetSide = 'right';
  @Input() className = '';

  isOpen = false;
  private subscription?: Subscription;

  constructor(private sheetService: SheetService) {}

  ngOnInit() {
    this.subscription = this.sheetService.state$.subscribe(state => {
      this.isOpen = state.open;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
    document.body.style.overflow = '';
  }

  get contentClasses(): string {
    const baseClasses =
      'bg-background fixed z-50 flex flex-col gap-4 shadow-lg transition-transform ease-in-out duration-300';
    
    const sideClasses: Record<SheetSide, string> = {
      right: 'inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm',
      left: 'inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm',
      top: 'inset-x-0 top-0 h-auto border-b',
      bottom: 'inset-x-0 bottom-0 h-auto border-t'
    };

    const transformClasses: Record<SheetSide, string> = {
      right: this.isOpen ? 'translate-x-0' : 'translate-x-full',
      left: this.isOpen ? 'translate-x-0' : '-translate-x-full',
      top: this.isOpen ? 'translate-y-0' : '-translate-y-full',
      bottom: this.isOpen ? 'translate-y-0' : 'translate-y-full'
    };

    return [
      baseClasses,
      sideClasses[this.side],
      transformClasses[this.side],
      this.className
    ].filter(Boolean).join(' ');
  }

  closeSheet() {
    this.sheetService.close();
  }

  handleOverlayClick() {
    this.closeSheet();
  }

  handleContentClick(event: Event) {
    event.stopPropagation();
  }
}
