import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RoleService } from '../../../Service/role-service';

@Component({
  selector: 'app-edit-role',
  imports: [CommonModule,HttpClientModule, ReactiveFormsModule],

  templateUrl: './edit-role.html',
  styleUrl: './edit-role.css'
})
export class EditRole implements OnInit {
   roleForm!: FormGroup;
  roleId!: number;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.roleId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRole();

    this.roleForm = this.fb.group({
      roleId: [0],
      roleCode: ['', Validators.required],
      roleName: ['', Validators.required],
      updatedBy: ['admin'], // You can set dynamically
      isActive: [true]
    });
  }

  loadRole(): void {
    this.roleService.getRoleById(this.roleId).subscribe({
      next: (role) => this.roleForm.patchValue(role),
      error: () => this.errorMessage = 'Failed to load role'
    });
  }

  onSubmit(): void {
    if (this.roleForm.invalid) return;

    this.roleService.updateRole(this.roleForm.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/admin/roles']), 1500);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to update role';
        this.successMessage = '';
      }
    });
  }

}
