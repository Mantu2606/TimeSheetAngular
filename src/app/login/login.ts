import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../Service/login-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login  {
  email = '';
  password = '';

  constructor(private auth: LoginService, private route: Router) {}

  onLogin() {
    if (!this.email || !this.password) {
      alert('Email aur password bharna zaroori hai');
      return;
    }

    this.auth.login(this.email, this.password).subscribe({
      next: (res) => {
        this.auth.saveUser(res);
        if (res.roleName === 'ADMIN') {
          this.route.navigate(['/admin']);
        } else {
          this.route.navigate(['/user-dashboard']);
        }
      },
      error: () => {
        alert('Login failed. Invalid credentials');
      }
    });
  }
}
