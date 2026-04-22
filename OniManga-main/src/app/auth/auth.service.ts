import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register/`, userData).pipe(
      tap(() => {
        if (userData.username && userData.email) {
          localStorage.setItem(`email_${userData.username}`, userData.email);
        }

        localStorage.setItem(`balance_${userData.username}`, '100');

        localStorage.setItem(
          `shipping_info_${userData.username}`,
          JSON.stringify({
            name: '',
            phone: '',
            address: '',
            city: ''
          })
        );

        localStorage.setItem(`cartItems_${userData.username}`, JSON.stringify([]));
      })
    );
  }

  login(credentials: { username: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/token/`, credentials).pipe(
      tap(res => {
        const savedEmail =
          localStorage.getItem(`email_${credentials.username}`) || '';

        localStorage.setItem(
          'user',
          JSON.stringify({
            username: credentials.username,
            token: res.access,
            email: savedEmail
          })
        );

        localStorage.setItem('username', credentials.username);
        localStorage.setItem('email', savedEmail);
        localStorage.setItem('access_token', res.access);

        const balanceKey = `balance_${credentials.username}`;
        const shippingKey = `shipping_info_${credentials.username}`;
        const cartKey = `cartItems_${credentials.username}`;

        const savedBalance = localStorage.getItem(balanceKey);
        if (savedBalance === null || isNaN(Number(savedBalance))) {
          localStorage.setItem(balanceKey, '100');
        }

        if (!localStorage.getItem(shippingKey)) {
          localStorage.setItem(
            shippingKey,
            JSON.stringify({
              name: '',
              phone: '',
              address: '',
              city: ''
            })
          );
        }

        if (!localStorage.getItem(cartKey)) {
          localStorage.setItem(cartKey, JSON.stringify([]));
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('access_token');
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
    return localStorage.getItem('access_token');
  }
}