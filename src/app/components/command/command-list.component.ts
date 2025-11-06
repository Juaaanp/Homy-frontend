import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-command-list',
  standalone: true,
  templateUrl: './command-list.component.html',
  styleUrls: ['./command-list.component.css']
})
export class CommandListComponent {
  @Input() className = '';
}
