import { Component, Input } from '@angular/core';
import { CollapsibleComponent } from './collapsible.component';

@Component({
  selector: 'app-collapsible-content',
  standalone: true,
  templateUrl: './collapsible-content.component.html',
  styleUrls: ['./collapsible-content.component.css']
})
export class CollapsibleContentComponent {
  constructor(public parent: CollapsibleComponent) {}

  @Input() animate = true;
}
