import { Component, OnInit } from '@angular/core';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RoleService } from '../../Service/role-service';

@Component({
  selector: 'app-role',
  imports: [ ReactiveFormsModule,HttpClientModule,CommonModule],
  templateUrl: './role.html',
  styleUrl: './role.css'
})
export class Role implements OnInit {
roleslist: any[] = [];
  errorMessage = '';
  successMessage: any;
  constructor(private roleService: RoleService, private router: Router) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (data) => {this.roleslist = data;},
      error: () => this.errorMessage = 'Failed to load roles'
    });
  }

  deleteRole(id: number): void {
  if (confirm('Are you sure you want to delete this role?')) {
    this.roleService.deleteRole(id).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.loadRoles(); // reload updated list
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err?.error?.message || 'Failed to delete role';
      }
    });
  }
}

  editRole(id: number): void {
  this.router.navigate(['/admin/roles/edit', id]);
}
}
