import { CommonModule } from '@angular/common';
import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from './dialog.service';

@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="open" class="dlg-overlay" (click)="onOverlayClick($event)">
  <div class="dlg-panel" (click)="$event.stopPropagation()" role="dialog" aria-modal="true">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styles: [
    `
    .dlg-overlay { position: fixed; inset:0; display:flex; align-items:center; justify-content:center; background: rgba(0,0,0,0.45); z-index: 1000 }
    .dlg-panel { background: var(--background,#fff); color:var(--foreground,#000); border-radius:8px; padding:18px; box-shadow: 0 10px 30px rgba(0,0,0,0.15); max-width: 90%; width: 520px; position: relative }
    `,
  ],
})
export class DialogContentComponent implements OnInit, OnDestroy {
  open = false;
  private sub!: Subscription;

  constructor(private svc: DialogService) {}

  ngOnInit(): void {
    this.sub = this.svc.state$.subscribe(s => (this.open = s.open));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onOverlayClick(e: MouseEvent) {
    // click on overlay closes
    this.svc.close();
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    this.svc.close();
  }
}
