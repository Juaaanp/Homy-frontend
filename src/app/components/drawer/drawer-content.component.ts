import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DrawerService } from './drawer.service';

@Component({
  selector: 'app-drawer-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="state.open" class="dr-overlay" (click)="onOverlayClick($event)">
      <div class="dr-panel" [ngClass]="state.direction" (click)="$event.stopPropagation()">
        <div class="dr-grab" *ngIf="showGrab"></div>
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
    .dr-overlay { position: fixed; inset: 0; z-index: 1000; }
    .dr-overlay { background: rgba(0,0,0,0.25); display:flex }
    .dr-panel { background: var(--background,#fff); box-shadow: 0 10px 30px rgba(0,0,0,0.12); position: absolute; display:flex; flex-direction:column }

    .dr-panel.right { top:0; right:0; height:100%; width:320px; border-left:1px solid rgba(0,0,0,0.06) }
    .dr-panel.left { top:0; left:0; height:100%; width:320px; border-right:1px solid rgba(0,0,0,0.06) }
    .dr-panel.top { top:0; left:0; right:0; height:40vh; border-bottom:1px solid rgba(0,0,0,0.06) }
    .dr-panel.bottom { bottom:0; left:0; right:0; height:40vh; border-top:1px solid rgba(0,0,0,0.06) }

    .dr-grab { width:100px; height:6px; border-radius:999px; background:var(--muted,#e5e7eb); margin:12px auto; display:block }
    `,
  ],
})
export class DrawerContentComponent implements OnInit, OnDestroy {
  state = { open: false, direction: 'right' as any };
  showGrab = true;
  private sub!: Subscription;

  constructor(private svc: DrawerService) {}

  ngOnInit(): void {
    this.sub = this.svc.state$.subscribe(s => (this.state = s));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onOverlayClick(e: MouseEvent) {
    this.svc.close();
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    this.svc.close();
  }
}
