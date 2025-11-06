import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type DrawerDirection = 'left' | 'right' | 'top' | 'bottom';
export type DrawerState = { open: boolean; direction: DrawerDirection };

@Injectable({ providedIn: 'root' })
export class DrawerService {
  private _state = new BehaviorSubject<DrawerState>({ open: false, direction: 'right' });
  readonly state$ = this._state.asObservable();

  open(direction: DrawerDirection = 'right') {
    this._state.next({ open: true, direction });
  }

  close() {
    const s = this._state.value;
    if (s.open) this._state.next({ ...s, open: false });
  }

  toggle(direction?: DrawerDirection) {
    const s = this._state.value;
    this._state.next({ open: !s.open, direction: direction ?? s.direction });
  }
}
