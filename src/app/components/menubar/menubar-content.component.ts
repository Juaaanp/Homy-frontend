import { CommonModule } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MenubarService } from './menubar.service';

@Component({
  selector: 'app-menubar-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="mb-portal" (click)="onOverlayClick($event)">
  <div class="mb-panel" [ngStyle]="{ left: x + 'px', top: y + 'px' }" (click)="$event.stopPropagation()">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
    .mb-portal { position: fixed; inset:0; z-index:1200 }
    .mb-panel { position:absolute; background:var(--popover,#fff); border:1px solid rgba(0,0,0,0.08); border-radius:6px; padding:6px; box-shadow:0 6px 18px rgba(0,0,0,0.08); min-width:12rem }
    `,
  ],
})
export class MenubarContentComponent implements OnInit, OnDestroy {
  @Input() menuId = '';

  open = false;
  x = 0;
  y = 0;

  private sub!: Subscription;

  constructor(private svc: MenubarService) {}

  ngOnInit(): void {
    this.sub = this.svc.state$.subscribe(s => {
      this.open = s.openId === this.menuId;
      if (this.open) {
        this.x = s.x ?? 0;
        this.y = s.y ?? 0;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onOverlayClick(e: MouseEvent) {
    this.svc.hide();
  }
}
