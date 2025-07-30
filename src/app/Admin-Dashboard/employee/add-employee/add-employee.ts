import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EmpService } from '../../../Service/emp-service';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule,RouterModule,CommonModule,HttpClientModule],

  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css'
})
export class AddEmployee {
 employeeForm!: FormGroup;
  submitted = false;
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private employeeService: EmpService, private router: Router) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      roleId: [null, Validators.required],
      empCode: ['', Validators.required],
      empName: ['', Validators.required],
      empMobileNo: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      empEmailId: ['', [Validators.required, Validators.email]],
      empPassword: ['', Validators.required],
      createdBy: ['admin'], // Replace with dynamic user later
      isActive: [true],
      lineManagerId: [null],
      lineManagerEmailId: ['']
    });
  }

  onSubmit(): void {
    this.submitted = true;
    this.successMessage = '';
    this.errorMessage = '';

    if (this.employeeForm.invalid) return;

    this.employeeService.addEmployee(this.employeeForm.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        this.router.navigate(['/admin/employees']);
        this.employeeForm.reset();
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Something went wrong';
      }
    });
  }
}
