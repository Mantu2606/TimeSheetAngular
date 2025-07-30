import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TimesheetAdmin, UserServices } from '../../Service/user-services';

@Component({
  selector: 'app-timesheet',
  imports: [HttpClientModule, CommonModule],
  templateUrl: './timesheet.html',
  styleUrl: './timesheet.css'
})
export class Timesheet implements OnInit {
 list: TimesheetAdmin[] = [];
  loading = true;
  error: string | null = null;

  constructor(private svc: UserServices) {}

  ngOnInit(): void {
    this.svc.getAdminTimesheets().subscribe({
      next: data => {
        this.list = data;
        this.loading = false;
      },
      error: err => {
        this.error = err.message || 'Error loading data';
        this.loading = false;
      }
    });
  }
}
