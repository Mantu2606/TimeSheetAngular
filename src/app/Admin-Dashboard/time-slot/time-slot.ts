import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Timeslot, TimeslotService } from '../../Service/timeslot-service';

@Component({
  selector: 'app-time-slot',
  imports: [HttpClientModule,CommonModule],
  templateUrl: './time-slot.html',
  styleUrl: './time-slot.css'
})
export class TimeSlot implements OnInit{
 timeslots: Timeslot[] = [];
  loading = true;
  error: string | null = null;

  constructor(private svc: TimeslotService, private router:Router) {}

  ngOnInit(): void {
    this.svc.getAllTimeslots().subscribe({
      next: data => {
        this.timeslots = data;
        this.loading = false;
      },
      error: err => {
        this.error = err.message || 'Error loading timeslots';
        this.loading = false;
      }
    });
  }

onEditClick(slot: Timeslot): void {
    // 2️⃣ Navigate to edit page with slot ID
    this.router.navigate(['/admin/timeslots/edit-timeslot', slot.sloT_ID])
      .then((success: boolean) => {
        if (!success) {
          console.error('Navigation to edit page failed');
        }
      });
  }

  deleteSlot(id: number): void {
    if (!confirm('Are you sure you want to delete this slot?')) return;
    this.svc.deleteTimeslot(id).subscribe({
      next: res => {
        alert(res.message);
        this.timeslots = this.timeslots.filter(s => s.sloT_ID !== id);
      },
      error: err => alert('Delete failed: ' + err.message)
    });
  }
}
