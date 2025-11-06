import { Component } from '@angular/core';

@Component({
  selector: 'app-input-otp-group',
  standalone: true,
  template: `
    <div data-slot="input-otp-group" class="flex items-center gap-1"><ng-content></ng-content></div>
  `,
})
export class InputOTPGroupComponent {}
