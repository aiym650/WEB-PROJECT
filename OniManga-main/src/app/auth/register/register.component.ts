import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] // Не забудь создать .css файл если его нет
})
export class RegisterComponent {
  userData = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) { }

  onRegister() {
    this.authService.register(this.userData).subscribe({
      next: () => {
        alert('Registration was succesfull! Now log in');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('Registration error. Please check your details.');
      }
    });
  }
}