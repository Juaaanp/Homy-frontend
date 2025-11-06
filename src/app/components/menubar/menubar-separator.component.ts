import { Component } from '@angular/core';

@Component({
  selector: 'app-menubar-separator',
  standalone: true,
  template: `<div class="mb-sep"></div>`,
  styles: [`.mb-sep{height:1px;margin:6px -4px;background:var(--border,#eee)}`]
})
export class MenubarSeparatorComponent {}
