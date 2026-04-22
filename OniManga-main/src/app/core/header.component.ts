import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { CartService } from '../core/cart.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username = '';
  password = '';

  constructor(
    public authService: AuthService,
    public router: Router,
    public cartService: CartService,
    private toastService: ToastService
  ) {}

  login() {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: () => {
        console.log('Logged in successfully');
        this.username = '';
        this.password = '';
      },
      error: () => this.toastService.show('Wrong credentials!')
    });
  }

  logout() {
    this.authService.logout();
  }
}