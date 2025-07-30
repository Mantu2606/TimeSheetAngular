import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Encryption } from './encryption';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'https://localhost:7275/api';

  constructor(private http: HttpClient, private router: Router,private encryptionService: Encryption) {}

  login(email: string, password: string) {
    return this.http.post<any>(`${this.baseUrl}/Employee/login`, {
      email,
      password
    });
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['']);
  }

  saveUser(user: any) {
      const encryptedUser = this.encryptionService.encrypt(user);
    sessionStorage.setItem('user', encryptedUser);
    console.log("Encrypted user stored in session:", encryptedUser); // 👀

  }

  getUser() {
    const user = sessionStorage.getItem('user');
return user ? this.encryptionService.decrypt(user) : null; // ✅ fixed
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

  getUserRole(): string | null {
     const encryptedUser = sessionStorage.getItem('user');
      return encryptedUser;
  }
}
