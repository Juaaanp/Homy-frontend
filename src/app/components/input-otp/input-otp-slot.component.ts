import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-otp-slot',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      data-slot="input-otp-slot"
      [attr.data-active]="isActive"
      class="inline-flex items-center justify-center h-9 w-9 border bg-white text-sm rounded"
    >
      <ng-container *ngIf="char; else empty">{{ char }}</ng-container>
      <ng-template #empty>
        <span *ngIf="hasFakeCaret" class="animate-caret-blink h-4 w-px bg-current"></span>
      </ng-template>
    </div>
  `,
})
export class InputOTPSlotComponent {
  @Input() index = 0;
  @Input() char?: string;
  @Input() isActive = false;
  @Input() hasFakeCaret = false;
}
