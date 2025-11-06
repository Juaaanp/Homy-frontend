import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SheetState = { open: boolean };

@Injectable({ providedIn: 'root' })
export class SheetService {
  private _state = new BehaviorSubject<SheetState>({ open: false });
  readonly state$ = this._state.asObservable();

  open() {
    this._state.next({ open: true });
    document.body.style.overflow = 'hidden';
  }

  close() {
    const s = this._state.value;
    if (s.open) {
      this._state.next({ open: false });
      document.body.style.overflow = '';
    }
  }

  toggle() {
    const s = this._state.value;
    if (s.open) {
      this.close();
    } else {
      this.open();
    }
  }
}
