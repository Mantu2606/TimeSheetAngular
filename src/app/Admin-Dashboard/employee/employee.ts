import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { EditEmployee } from './edit-employee/edit-employee';
import { employee, EmpService } from '../../Service/emp-service';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, HttpClientModule,EditEmployee],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee implements OnInit {
  constructor(private empService: EmpService, private http: HttpClient) { }

  employees: any[] = [];
  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.empService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
      },
      error: (err) => {
        console.error('Error loading employees:', err);
      }
    });
  }

  selectedEmployee!: employee;
  showEditForm = false;

  edit(emp: employee): void {
    this.selectedEmployee = emp;
    this.showEditForm = true;
  }

  deleteEmployee(id: number): void {
  if (confirm('Are you sure you want to delete this employee?')) {
    this.empService.deleteEmployee(id).subscribe({
      next: (res) => {
        alert(res.message);
        this.loadEmployees(); // Refresh the list after delete
      },
      error: (err) => {
        console.error('Delete error:', err);
        alert('Error deleting employee');
      }
    });
  }
}

}
