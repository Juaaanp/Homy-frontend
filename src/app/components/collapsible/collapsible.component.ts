import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-collapsible',
  standalone: true,
  templateUrl: './collapsible.component.html',
  styleUrls: ['./collapsible.component.css']
})
export class CollapsibleComponent {
  @Input() open = false;
  @Output() openChange = new EventEmitter<boolean>();

  toggle() {
    this.open = !this.open;
    this.openChange.emit(this.open);
  }

  openIt() {
    if (!this.open) {
      this.open = true;
      this.openChange.emit(this.open);
    }
  }

  closeIt() {
    if (this.open) {
      this.open = false;
      this.openChange.emit(this.open);
    }
  }
}
