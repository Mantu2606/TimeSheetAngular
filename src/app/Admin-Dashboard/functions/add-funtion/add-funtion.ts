import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Role,RoleService } from '../../../Service/role-service';
import { FunctionModel, FunctionService } from '../../../Service/function-service';

@Component({
  selector: 'app-add-funtion',
   imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './add-funtion.html',
  styleUrl: './add-funtion.css'
})
export class AddFuntion {
functionForm!: FormGroup;
fb: FormBuilder;
  roleslist: Role[]=[];
   errorMessage: string | undefined;

constructor(fb: FormBuilder, private functionService:FunctionService, private roleService: RoleService) {
  this.fb = fb;
}

ngOnInit(): void {
  // this.loadFunctions(); // Load list
  this.functionForm = this.fb.group({
    rolE_ID: ['', Validators.required],
    fuN_CODE: ['', Validators.required],
    fuN_NAME: ['', Validators.required],
    createD_BY: ['', Validators.required],
    iS_ACTIVE: [true, Validators.required]
  });

  this.loadRoles();
}

addFunction() {
  if (this.functionForm.invalid) return;

  const newFunction: FunctionModel = this.functionForm.value;
  this.functionService.insertFunction(newFunction).subscribe({
    next: (res) => {
      alert('Function inserted successfully!');
      this.functionForm.reset({ iS_ACTIVE: true });
      // this.loadFunctions(); // Reload table
      console.log(newFunction)
    },
    error: (err) => {
      console.error('Insert error:', err);
      alert('Failed to insert function.');
    }
  });
}


loadRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (data) => {this.roleslist = data; console.log(this.roleslist)},
      error: () => this.errorMessage = 'Failed to load roles'
    });
  }
}

