import { Component, Input, Optional, Host, ElementRef, OnInit, OnDestroy, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopoverComponent } from './popover.component';
import { ConnectedPosition, OverlayModule } from '@angular/cdk/overlay';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-popover-content',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  template: `
    <div *ngIf="popover.open" 
         [class]="contentClasses"
         [@popoverAnimation]
         [attr.data-slot]="'popover-content'"
         [attr.data-state]="popover.open ? 'open' : 'closed'">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      z-index: 50;
    }
  `],
  animations: [
    trigger('popoverAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.95)' }),
        animate('200ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('150ms ease-in', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class PopoverContentComponent implements OnInit {
  @Input() className: string = '';
  @Input() align: 'start' | 'center' | 'end' = 'center';
  @Input() sideOffset: number = 4;

  constructor(
    @Optional() @Host() public popover: PopoverComponent,
    private elementRef: ElementRef
  ) {}

  ngOnInit() {
    // Posicionamiento basado en el align
    this.updatePosition();
  }

  get contentClasses(): string {
    return [
      'bg-white dark:bg-gray-800',
      'text-gray-900 dark:text-gray-100',
      'z-50 w-72 rounded-md border',
      'border-gray-200 dark:border-gray-700',
      'p-4 shadow-md outline-none',
      'data-[state=open]:animate-in',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95',
      'data-[state=open]:zoom-in-95',
      this.className
    ].filter(Boolean).join(' ');
  }

  private updatePosition() {
  // This logic can be improved with CDK Overlay for dynamic positioning
    const styles = this.elementRef.nativeElement.style;
    styles.marginTop = `${this.sideOffset}px`;
  }
}