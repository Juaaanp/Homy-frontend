import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ContextMenuState = {
  open: boolean;
  x: number;
  y: number;
};

@Injectable({ providedIn: 'root' })
export class ContextMenuService {
  private _state = new BehaviorSubject<ContextMenuState>({ open: false, x: 0, y: 0 });
  readonly state$ = this._state.asObservable();

  show(x: number, y: number) {
    this._state.next({ open: true, x, y });
  }

  hide() {
    const s = this._state.value;
    if (s.open) this._state.next({ ...s, open: false });
  }
}
