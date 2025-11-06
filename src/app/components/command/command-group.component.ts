import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-command-group',
  standalone: true,
  imports: [CommonModule],
  template: `<div data-slot="command-group" class="cg-root"><div *ngIf="heading" class="cg-heading">{{ heading }}</div><div class="cg-items"><ng-content></ng-content></div></div>`,
  styles: [`.cg-root { padding:0.25rem 0; } .cg-heading { padding:0.5rem 0.5rem; font-size:0.75rem; color:var(--muted-foreground,#6b7280); font-weight:600; } .cg-items { padding:0 0.25rem; }`]
})
export class CommandGroupComponent { @Input() heading?: string }
