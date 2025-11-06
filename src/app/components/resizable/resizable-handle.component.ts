import {
  Component,
  Input,
  HostBinding,
  HostListener,
  ElementRef,
  signal
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resizable-handle',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './resizable-handle.component.html',
  styleUrls: ['./resizable-handle.component.css']
})
export class ResizableHandleComponent {
  @Input() withHandle = false;
  @Input() className = '';

  isDragging = signal(false);

  constructor(private elementRef: ElementRef) {}

  @HostBinding('class')
  get hostClasses(): string {
    const baseClasses =
      'bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden';
    const verticalClasses =
      'data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0';
    return [baseClasses, verticalClasses, this.className].filter(Boolean).join(' ');
  }

  @HostBinding('attr.data-panel-resize-handle-enabled')
  get isEnabled(): boolean {
    return true;
  }

  @HostBinding('attr.tabindex')
  get tabindex(): number {
    return 0;
  }

  @HostBinding('attr.role')
  get role(): string {
    return 'separator';
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.isDragging.set(true);
    this.startResize(event);
  }

  @HostListener('document:mouseup')
  onMouseUp(): void {
    if (this.isDragging()) {
      this.isDragging.set(false);
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isDragging()) {
      this.resize(event);
    }
  }

  private startResize(event: MouseEvent): void {
    const handle = this.elementRef.nativeElement;
    const parent = handle.parentElement;
    if (!parent) return;

    const prevPanel = handle.previousElementSibling;
    const nextPanel = handle.nextElementSibling;

    if (!prevPanel || !nextPanel) return;

    const parentRect = parent.getBoundingClientRect();
    const isVertical = parent.getAttribute('data-panel-group-direction') === 'vertical';

    handle['resizeData'] = {
      prevPanel,
      nextPanel,
      parentRect,
      isVertical,
      startPos: isVertical ? event.clientY : event.clientX
    };
  }

  private resize(event: MouseEvent): void {
    const handle = this.elementRef.nativeElement;
    const resizeData = handle['resizeData'];

    if (!resizeData) return;

    const { prevPanel, nextPanel, parentRect, isVertical, startPos } = resizeData;

    const currentPos = isVertical ? event.clientY : event.clientX;
    const delta = currentPos - startPos;
    const parentSize = isVertical ? parentRect.height : parentRect.width;
    const deltaPercent = (delta / parentSize) * 100;

    const prevFlexGrow = parseFloat(
      window.getComputedStyle(prevPanel).flexGrow || '1'
    );
    const nextFlexGrow = parseFloat(
      window.getComputedStyle(nextPanel).flexGrow || '1'
    );

    const newPrevFlexGrow = Math.max(0.1, prevFlexGrow + deltaPercent / 10);
    const newNextFlexGrow = Math.max(0.1, nextFlexGrow - deltaPercent / 10);

    prevPanel.style.flexGrow = newPrevFlexGrow.toString();
    nextPanel.style.flexGrow = newNextFlexGrow.toString();

    handle['resizeData'].startPos = currentPos;
  }
}
