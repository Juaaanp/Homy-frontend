import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-command-input',
  standalone: true,
  templateUrl: './command-input.component.html',
  styleUrls: ['./command-input.component.css']
})
export class CommandInputComponent {
  @Input() placeholder = 'Search...';
  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  onInput(e: Event) { this.value = (e.target as HTMLInputElement).value; this.valueChange.emit(this.value); }
}
