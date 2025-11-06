import { Component, Input, HostBinding } from '@angular/core';
import { CommonModule } from '@angular/common';

type SeparatorOrientation = 'horizontal' | 'vertical';

@Component({
  selector: 'app-separator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './separator.component.html',
  styleUrls: ['./separator.component.css']
})
export class SeparatorComponent {
  @Input() orientation: SeparatorOrientation = 'horizontal';
  @Input() decorative = true;
  @Input() className = '';

  @HostBinding('class')
  get hostClasses(): string {
    const baseClasses = 'bg-border shrink-0';
    const orientationClasses =
      this.orientation === 'horizontal'
        ? 'h-px w-full'
        : 'h-full w-px';
    return [baseClasses, orientationClasses, this.className].filter(Boolean).join(' ');
  }

  @HostBinding('attr.data-slot')
  get dataSlot(): string {
    return 'separator-root';
  }

  @HostBinding('attr.data-orientation')
  get dataOrientation(): string {
    return this.orientation;
  }

  @HostBinding('attr.role')
  get role(): string | null {
    return this.decorative ? 'none' : 'separator';
  }

  @HostBinding('attr.aria-orientation')
  get ariaOrientation(): string | null {
    return !this.decorative ? this.orientation : null;
  }
}
