import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-command',
  standalone: true,
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent {
  @Input() className = '';
}
