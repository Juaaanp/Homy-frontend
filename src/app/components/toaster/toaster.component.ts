import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterService, Toast, ToastPosition } from './toaster.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css'],
  host: {
    'class': 'toaster-container',
    '[attr.data-position]': 'position'
  }
})
export class ToasterComponent implements OnInit, OnDestroy {
  @Input() position: ToastPosition = 'bottom-right';
  @Input() expand = false;
  @Input() richColors = true;
  @Input() closeButton = false;

  toasts: Toast[] = [];
  private subscription?: Subscription;

  constructor(private toasterService: ToasterService) {}

  ngOnInit(): void {
    this.subscription = this.toasterService.toasts$.subscribe(toasts => {
      this.toasts = toasts;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getIcon(type: Toast['type']): string {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      case 'loading':
        return '⏳';
      default:
        return '';
    }
  }

  dismiss(id: string): void {
    this.toasterService.dismiss(id);
  }

  handleAction(toast: Toast): void {
    if (toast.action?.onClick) {
      toast.action.onClick();
      this.dismiss(toast.id);
    }
  }

  handleCancel(toast: Toast): void {
    if (toast.cancel?.onClick) {
      toast.cancel.onClick();
    }
    this.dismiss(toast.id);
  }

  trackByToastId(index: number, toast: Toast): string {
    return toast.id;
  }
}
