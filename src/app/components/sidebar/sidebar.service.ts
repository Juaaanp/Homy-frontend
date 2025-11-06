import { Injectable, signal, computed, effect } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type SidebarState = 'expanded' | 'collapsed';

export interface SidebarContextState {
  state: SidebarState;
  open: boolean;
  openMobile: boolean;
  isMobile: boolean;
}

@Injectable()
export class SidebarService {
  // Constants
  readonly SIDEBAR_WIDTH = '16rem';
  readonly SIDEBAR_WIDTH_MOBILE = '18rem';
  readonly SIDEBAR_WIDTH_ICON = '3rem';
  readonly SIDEBAR_KEYBOARD_SHORTCUT = 'b';
  readonly SIDEBAR_COOKIE_NAME = 'sidebar_state';
  readonly SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

  // Signals for reactive state
  private _open = signal<boolean>(true);
  private _openMobile = signal<boolean>(false);
  private _isMobile = signal<boolean>(false);

  // Public readonly signals
  readonly open = this._open.asReadonly();
  readonly openMobile = this._openMobile.asReadonly();
  readonly isMobile = this._isMobile.asReadonly();

  // Computed state
  readonly state = computed<SidebarState>(() => 
    this._open() ? 'expanded' : 'collapsed'
  );

  constructor() {
    // Load saved state from cookie
    this.loadStateFromCookie();

    // Setup keyboard shortcut
    this.setupKeyboardShortcut();

    // Detect mobile
    this.detectMobile();
  }

  setOpen(value: boolean) {
    this._open.set(value);
    this.saveStateToCookie(value);
  }

  setOpenMobile(value: boolean) {
    this._openMobile.set(value);
    // Control body scroll
    if (value) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  toggleSidebar() {
    if (this._isMobile()) {
      this.setOpenMobile(!this._openMobile());
    } else {
      this.setOpen(!this._open());
    }
  }

  setIsMobile(value: boolean) {
    this._isMobile.set(value);
  }

  private loadStateFromCookie() {
    if (typeof document === 'undefined') return;
    
    const cookies = document.cookie.split(';');
    const sidebarCookie = cookies.find(c => 
      c.trim().startsWith(`${this.SIDEBAR_COOKIE_NAME}=`)
    );
    
    if (sidebarCookie) {
      const value = sidebarCookie.split('=')[1];
      this._open.set(value === 'true');
    }
  }

  private saveStateToCookie(open: boolean) {
    if (typeof document === 'undefined') return;
    
    document.cookie = `${this.SIDEBAR_COOKIE_NAME}=${open}; path=/; max-age=${this.SIDEBAR_COOKIE_MAX_AGE}`;
  }

  private setupKeyboardShortcut() {
    if (typeof window === 'undefined') return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === this.SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        this.toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
  }

  private detectMobile() {
    if (typeof window === 'undefined') return;

    const checkMobile = () => {
      this._isMobile.set(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
  }
}
