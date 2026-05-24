import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export type UserType = 'DM' | 'PLAYER';

export interface AuthResponse {
  type: UserType[];
  token: string;
}

export interface TypeLoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  login(email: string, pass: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, {
      email,
      pass,
    });
  }

  loginUser(code: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/login-user`, {
      code,
    });
  }

  logout(token: string): Observable<void> {
    return this.http.post<void>(`${this.api}/auth/logout`, { token });
  }

  typeLogin(token: string, type: UserType): Observable<TypeLoginResponse> {
    return this.http.post<TypeLoginResponse>(`${this.api}/auth/type-login`, {
      token,
      type,
    });
  }
}
