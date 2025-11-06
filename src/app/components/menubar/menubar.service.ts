import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type MenubarState = {
  openId?: string;
  x?: number;
  y?: number;
};

@Injectable({ providedIn: 'root' })
export class MenubarService {
  private _state = new BehaviorSubject<MenubarState>({});
  readonly state$ = this._state.asObservable();

  show(id: string, x?: number, y?: number) {
    this._state.next({ openId: id, x, y });
  }

  hide() {
    this._state.next({});
  }
}
