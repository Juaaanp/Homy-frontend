import { Injectable, Signal, signal } from '@angular/core';

const MOBILE_BREAKPOINT = 768;

@Injectable({ providedIn: 'root' })
export class IsMobileService {
  private _isMobile = signal<boolean>(window.innerWidth < MOBILE_BREAKPOINT);

  get isMobile(): Signal<boolean> {
    return this._isMobile;
  }

  constructor() {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      this._isMobile.set(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    window.addEventListener('resize', onChange);
    // Cleanup on destroy (not needed for singleton service)
  }
}
