import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../Service/login-service';
import { Encryption } from '../Service/encryption';
@Component({
  selector: 'app-navbar-component',
  imports: [CommonModule],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.css'
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(private router: Router, private logoutMethod:LoginService ,   private encryptionService: Encryption) {}

  ngOnInit(): void {
   const encryptedUser = sessionStorage.getItem('user');
    if (encryptedUser) {
      this.user = this.encryptionService.decrypt(encryptedUser); // ✅ decrypted
    } else {
      this.router.navigate(['/']); // if not logged in
    }
  }

  
  logout() {
    this.logoutMethod.logout(); 
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
