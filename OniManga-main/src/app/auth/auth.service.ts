import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Импортируем клиент
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api'; // Будущий адрес Django

  constructor(private http: HttpClient, private router: Router) { }

  // Метод регистрации (теперь ошибка в компоненте исчезнет)
  register(userData: any): Observable<any> {
    // Этот запрос уйдет на Django, когда мы его запустим
    return this.http.post(`${this.apiUrl}/register/`, userData);
  }

  // Обновленный метод логина для работы с API
  login(credentials: { username: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/`, credentials).pipe(
      tap(res => {
        // Сохраняем данные пользователя и токен
        localStorage.setItem('user', JSON.stringify({
          username: credentials.username,
          token: res.access
        }));
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

  getUsername(): string {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).username : '';
  }

  getToken(): string | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user).token : null;
  }
}