import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

let nextGroupId = 1;

@Component({
  selector: 'app-radio-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.css']
})
export class RadioGroupComponent {
  /** Name attribute shared by inner radio inputs. Auto-generated if not provided. */
  @Input() name?: string;
  /** Current selected value */
  @Input() value: string | null = null;
  /** Disabled state for the whole group */
  @Input() disabled = false;
  /** Invalid/aria-invalid state for the group */
  @Input() invalid = false;
  /** Extra CSS classes */
  @Input() className = '';

  @Output() valueChange = new EventEmitter<string>();

  private readonly id = nextGroupId++;

  get groupName(): string {
    return this.name || `app-radio-group-${this.id}`;
  }

  select(value: string) {
    if (this.disabled) return;
    this.value = value;
    this.valueChange.emit(value);
  }

  get hostClasses(): string {
    // Use Bootstrap utilities for layout
    return ['d-grid', 'gap-3', this.className].filter(Boolean).join(' ');
  }
}
