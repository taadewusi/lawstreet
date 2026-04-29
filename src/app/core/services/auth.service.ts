import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse, RegisterRequest, User } from '../models/user.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  private _user = new BehaviorSubject<User | null>(null);
  private _token = new BehaviorSubject<string | null>(null);

  user$ = this._user.asObservable();
  token$ = this._token.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const token = localStorage.getItem('access_token');
    const user = localStorage.getItem('user');
    if (token && user) {
      this._token.next(token);
      this._user.next(JSON.parse(user));
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('refresh_token', res.refreshToken);
        localStorage.setItem('user', JSON.stringify(res.user));
        this._token.next(res.accessToken);
        this._user.next(res.user);
      })
    );
  }

  register(data: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, data);
  }

  logout(): void {
    localStorage.clear();
    this._token.next(null);
    this._user.next(null);
    this.router.navigate(['/']);
  }

  get currentUser(): User | null { return this._user.getValue(); }
  get token(): string | null { return this._token.getValue(); }
  get isAuthenticated(): boolean { return !!this._token.getValue(); }

  hasRole(role: string): boolean {
    return this.currentUser?.roles?.includes(role) ?? false;
  }
  isAdmin(): boolean {
    return this.hasRole('ADMIN') || this.hasRole('SUPER_ADMIN');
  }
}
