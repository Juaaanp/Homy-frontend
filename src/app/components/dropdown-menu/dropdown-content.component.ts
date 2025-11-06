import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DropdownService } from './dropdown.service';

@Component({
  selector: 'app-dropdown-menu-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="dm-overlay" (click)="onOverlayClick($event)">
      <div class="dm-panel" [ngStyle]="{ left: x + 'px', top: y + 'px' }" (click)="$event.stopPropagation()">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
      .dm-overlay { position: fixed; inset: 0; z-index: 1000; }
      .dm-panel { position: absolute; background: var(--popover,#fff); color:var(--popover-foreground,#111); border:1px solid rgba(0,0,0,0.08); border-radius:6px; padding:6px; box-shadow:0 6px 18px rgba(0,0,0,0.08); min-width:8rem }
    `,
  ],
})
export class DropdownMenuContentComponent implements OnInit, OnDestroy {
  open = false;
  x = 0;
  y = 0;
  private sub!: Subscription;

  constructor(private svc: DropdownService) {}

  ngOnInit(): void {
    this.sub = this.svc.state$.subscribe(s => {
      this.open = s.open;
      this.x = s.x;
      this.y = s.y;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onOverlayClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (target.classList.contains('dm-overlay')) this.svc.hide();
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    this.svc.hide();
  }
}
