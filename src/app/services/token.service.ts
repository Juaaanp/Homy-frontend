import { Injectable } from '@angular/core';

const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  /**
   * Guarda el token en sessionStorage
   */
  private setToken(token: string) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Obtiene el token guardado en sessionStorage
   */
  public getToken(): string | null {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Verifica si el usuario está logueado
   */
  public isLogged(): boolean {
    return !!this.getToken();
  }

  /**
   * Inicia sesión guardando el token
   */
  public login(token: string) {
    this.setToken(token);
  }

  /**
   * Cierra sesión borrando el token
   */
  public logout() {
    sessionStorage.clear();
  }

  /**
   * Decodifica el payload del token JWT
   */
  private decodePayload(token: string): any {
    try {
      const payload = token.split(".")[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  }

  /**
   * Obtiene el payload decodificado del token actual
   */
  private getPayload(): any {
    const token = this.getToken();
    return token ? this.decodePayload(token) : null;
  }

  /**
   * Obtiene el ID del usuario desde el token
   */
  public getUserId(): string {
    return this.getPayload()?.sub || "";
  }

  /**
   * Obtiene el rol del usuario desde el token
   */
  public getRole(): string {
    const payload = this.getPayload();
    // El backend envía roles como array: ["HOST"] o ["GUEST"]
    const roles = payload?.roles;
    return Array.isArray(roles) && roles.length > 0 ? roles[0] : '';
  }

  public getEmail(): string {
    const payload = this.getPayload();
    return payload?.email || '';
  }
}
