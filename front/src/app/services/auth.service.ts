import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable, tap } from 'rxjs';

interface CustomJwtPayload extends JwtPayload {
  userId?: string;
  
}
export interface JwtPayload {
  id: string;
  name: string;
  exp: number;
  iat: number;
  // adicione outros campos conforme seu JWT
}
@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { email: string; password: string }): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token); // salva token
      })
    );
  }
  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
      const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      // Tenta decodificar o token
      const decodedToken = jwtDecode<CustomJwtPayload>(token);

     
      if (!decodedToken.exp) {
        console.warn('Token JWT sem claim de expiração (exp). Considerando não autenticado.');
        return false;
      }

      // Obtém a data/hora atual em segundos (mesmo formato do exp)
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp < currentTime) {
        // Token expirou
        console.log('Token JWT expirado. Realizando logout.');
        this.logout(); 
        return false;
      }

      // Token existe e não expirou
      return true;

    } catch (error) {
      
      console.error('Erro ao decodificar token JWT:', error);
       this.logout();
      return false;
    }
  }

  getUserId(): string | null {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      return decoded.id;
    } catch (e) {
      console.error('Erro ao decodificar JWT', e);
      return null;
    }
  }

}