import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FunctionService,FunctionModel } from '../../../Service/function-service';
import { RoleService } from '../../../Service/role-service';

@Component({
  selector: 'app-edit-funtion',
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './edit-funtion.html',
  styleUrl: './edit-funtion.css'
})
export class EditFuntion implements OnInit {
 functionForm!: FormGroup;
  roleslist: any[] = [];
  editFunctionId!: number;
  errorMessage: string | undefined;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private functionService: FunctionService,
    private roleService: RoleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.functionForm = this.fb.group({
      rolE_ID: ['', Validators.required],
      fuN_CODE: ['', Validators.required],
      fuN_NAME: ['', Validators.required],
      updateD_BY: ['', Validators.required],
      iS_ACTIVE: [true, Validators.required]
    });

    this.loadRoles();

    // Get ID from route and fetch function
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editFunctionId = +idParam;
      this.loadFunctionById(this.editFunctionId);
    }
  }

  loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (data) => {this.roleslist = data, console.log(this.roleslist)},
      error: () => this.errorMessage = 'Failed to load roles'
    });
  }

  loadFunctionById(id: number): void {
    this.isLoading = true;
    this.functionService.getFunctionById(id).subscribe({
      next: (func: FunctionModel) => {
        this.functionForm.patchValue({
          rolE_ID: func.rolE_ID,
          fuN_CODE: func.fuN_CODE,
          fuN_NAME: func.fuN_NAME,
          updateD_BY: func.updateD_BY || '',
          iS_ACTIVE: func.iS_ACTIVE
        });
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Failed to load function';
        this.isLoading = false;
      }
    });
  }

  submitFunction(): void {
    if (this.functionForm.invalid) return;

    const formValue = this.functionForm.value;

    this.functionService.updateFunction(this.editFunctionId, formValue).subscribe({
      next: () => {
        alert('Function updated successfully!');
        this.router.navigate(['/functions']); // redirect after update
      },
      error: (err) => {
        console.error('Update error:', err);
        this.errorMessage = 'Failed to update function';
        console.log("JSON", formValue)
      }
    });
  }

  cancelEdit(): void {
    this.router.navigate(['/functions']);
  }
}
