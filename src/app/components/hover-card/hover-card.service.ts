import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type HoverCardState = {
  open: boolean;
  x: number;
  y: number;
  align?: 'center' | 'start' | 'end';
  sideOffset?: number;
};

@Injectable({ providedIn: 'root' })
export class HoverCardService {
  private _state = new BehaviorSubject<HoverCardState>({
    open: false,
    x: 0,
    y: 0,
    align: 'center',
    sideOffset: 4,
  });

  readonly state$ = this._state.asObservable();
  private hideTimeout?: any;

  show(x: number, y: number, align: HoverCardState['align'] = 'center', sideOffset = 4) {
    this.clearHideTimeout();
    this._state.next({ open: true, x, y, align, sideOffset });
  }

  scheduleHide(delay = 120) {
    this.clearHideTimeout();
    this.hideTimeout = setTimeout(() => this.hide(), delay);
  }

  clearHideTimeout() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  hide() {
    const s = this._state.value;
    if (s.open) this._state.next({ ...s, open: false });
  }
}
