import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  onRegister() {
    this.authService.register(this.userData).subscribe({
      next: () => {
        this.toastService.show('Registration was successful! Now log in');
        this.router.navigate(['/login']);
      },
      error: (err) => {
  console.error(err);

  if (err.error) {
    if (err.error.email) {
      this.toastService.show(err.error.email[0]);
    } else if (err.error.username) {
      this.toastService.show(err.error.username[0]);
    } else if (err.error.password) {
      this.toastService.show(err.error.password[0]);
    } else if (err.error.detail) {
      this.toastService.show(err.error.detail);
    } else {
      this.toastService.show('Registration failed');
    }
  } else {
    this.toastService.show('Server error');
  }
}
    });
  }
}