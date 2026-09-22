import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { User } from '../models/study.models';

interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:5001/api/auth';
  readonly user = signal<User | null>(this.readUser());

  constructor(private readonly http: HttpClient) {}

  get token(): string | null {
    return localStorage.getItem('studyflow_token');
  }

  async login(email: string, password: string): Promise<void> {
    const result = await firstValueFrom(this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }));
    this.saveSession(result);
  }

  async register(name: string, email: string, password: string): Promise<void> {
    const result = await firstValueFrom(this.http.post<AuthResponse>(`${this.apiUrl}/register`, { name, email, password }));
    this.saveSession(result);
  }

  async logout(): Promise<void> {
    if (this.token) await firstValueFrom(this.http.post(`${this.apiUrl}/logout`, {}));
    localStorage.removeItem('studyflow_token');
    localStorage.removeItem('studyflow_user');
    this.user.set(null);
  }

  clearSession(): void {
    localStorage.removeItem('studyflow_token');
    localStorage.removeItem('studyflow_user');
    this.user.set(null);
  }

  private saveSession(result: AuthResponse): void {
    localStorage.setItem('studyflow_token', result.token);
    localStorage.setItem('studyflow_user', JSON.stringify(result.user));
    this.user.set(result.user);
  }

  private readUser(): User | null {
    const saved = localStorage.getItem('studyflow_user');
    return saved ? JSON.parse(saved) as User : null;
  }
}
