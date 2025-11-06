import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type DialogState = { open: boolean };

@Injectable({ providedIn: 'root' })
export class DialogService {
  private _state = new BehaviorSubject<DialogState>({ open: false });
  readonly state$ = this._state.asObservable();

  open() {
    this._state.next({ open: true });
  }

  close() {
    const s = this._state.value;
    if (s.open) this._state.next({ open: false });
  }

  toggle() {
    const s = this._state.value;
    this._state.next({ open: !s.open });
  }
}
