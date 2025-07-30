import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { employee,EmpService } from '../../../Service/emp-service';

@Component({
  selector: 'app-edit-employee',
  imports: [ReactiveFormsModule],

  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css'
})
export class EditEmployee implements OnInit {
@Input() selectedEmployee!: employee;
  employeeForm!: FormGroup;
  submitted = false;
  message = '';

  constructor(private fb: FormBuilder, private empService: EmpService) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      empId: [this.selectedEmployee.empId],
      roleId: [this.selectedEmployee.roleId, Validators.required],
      empCode: [this.selectedEmployee.empCode, Validators.required],
      empName: [this.selectedEmployee.empName, Validators.required],
      empMobileNo: [this.selectedEmployee.empMobileNo, Validators.required],
      empEmailId: [this.selectedEmployee.empEmailId, [Validators.required, Validators.email]],
      empPassword: [this.selectedEmployee.empPassword],
      isActive: [this.selectedEmployee.isActive],
      updatedBy: ['admin'], // Or get from session
      lineManagerId: [this.selectedEmployee.lineManagerId],
      lineManagerEmailId: [this.selectedEmployee.lineManagerEmailId]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.employeeForm.invalid) {
      return;
    }

    this.empService.updateEmployee(this.employeeForm.value).subscribe({
      next: (res) => {
        this.message = res.message;
        alert(this.message);
      },
      error: (err) => {
        console.error(err);
        alert("Error updating employee.");
      }
    });
  }
}

