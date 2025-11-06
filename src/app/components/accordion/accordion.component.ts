import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {
  /**
   * Items to render. Each item can contain HTML in `content` (rendered with innerHTML).
   */
  @Input() items: Array<{ title: string; content: string }> = [];

  /** Allow multiple items to be open at the same time (default: false -> single open) */
  @Input() allowMultiple = false;

  protected openIndexes = new Set<number>();

  toggle(index: number) {
    if (this.allowMultiple) {
      if (this.openIndexes.has(index)) this.openIndexes.delete(index);
      else this.openIndexes.add(index);
    } else {
      if (this.openIndexes.has(index)) this.openIndexes.clear();
      else {
        this.openIndexes.clear();
        this.openIndexes.add(index);
      }
    }
  }

  isOpen(index: number) {
    return this.openIndexes.has(index);
  }
}
