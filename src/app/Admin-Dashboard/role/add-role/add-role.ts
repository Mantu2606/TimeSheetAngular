import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleService } from '../../../Service/role-service';

@Component({
  selector: 'app-add-role',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './add-role.html',
  styleUrl: './add-role.css'
})
export class AddRole implements OnInit {
roleForm!: FormGroup;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleForm = this.fb.group({
      roleCode: ['', Validators.required],
      roleName: ['', Validators.required],
      createdBy: ['admin'], // replace with actual logged-in user if needed
      isActive: [true]
    });
  }

  onSubmit(): void {
    if (this.roleForm.invalid) return;

    this.roleService.addRole(this.roleForm.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        this.roleForm.reset({ isActive: true, createdBy: 'admin' });
        setTimeout(() => this.router.navigate(['/admin/roles']), 1500);
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = err.error?.message || 'Failed to add role';
      }
    });
  }
}
