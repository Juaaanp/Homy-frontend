import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HoverCardService } from './hover-card.service';

@Component({
  selector: 'app-hover-card-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="hc-portal">
      <div class="hc-panel" [ngStyle]="style" (mouseenter)="onEnter()" (mouseleave)="onLeave()">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
    .hc-portal { position: fixed; inset: 0; z-index: 1200; pointer-events: none }
    .hc-panel { pointer-events: auto; position: absolute; background: var(--popover,#fff); color:var(--popover-foreground,#111); border:1px solid rgba(0,0,0,0.08); border-radius:8px; padding:12px; box-shadow:0 6px 18px rgba(0,0,0,0.08); width:16rem }
    `,
  ],
})
export class HoverCardContentComponent implements OnInit, OnDestroy {
  open = false;
  x = 0;
  y = 0;
  align: 'center' | 'start' | 'end' = 'center';
  sideOffset = 4;
  style: { left?: string; top?: string; transform?: string } = {};
  private sub?: Subscription;

  constructor(private svc: HoverCardService) {}

  ngOnInit(): void {
    this.sub = this.svc.state$.subscribe(s => {
      this.open = s.open;
      this.x = s.x;
      this.y = s.y;
      this.align = s.align ?? 'center';
      this.sideOffset = s.sideOffset ?? 4;
      this.computeStyle();
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  computeStyle() {
    // Basic placement: show below the trigger, adjust by align
    const left = this.x;
    const top = this.y + this.sideOffset;

    // Align: center -> translateX(-50%); start -> translateX(0); end -> translateX(-100%)
    let transform = '';
    if (this.align === 'center') transform = 'translateX(-50%)';
    else if (this.align === 'end') transform = 'translateX(-100%)';
    else transform = 'translateX(0)';

    this.style = { left: `${left}px`, top: `${top}px`, transform };
  }

  onEnter() {
    this.svc.clearHideTimeout();
  }

  onLeave() {
    this.svc.scheduleHide();
  }
}
