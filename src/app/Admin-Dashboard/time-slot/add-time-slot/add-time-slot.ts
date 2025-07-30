import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AddTimeslot, Timeslot, TimeslotService } from '../../../Service/timeslot-service';

@Component({
  selector: 'app-add-time-slot',
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './add-time-slot.html',
  styleUrl: './add-time-slot.css'
})
export class AddTimeSlot implements OnInit{
timeslots: Timeslot[] = [];
  slotForm!: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(private svc: TimeslotService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loadSlots();
    this.slotForm = this.fb.group({
      timeslot: ['', Validators.required],
      createdBy: ['', Validators.required],
      isActive: [true]
    });
  }

  loadSlots(): void {
    this.loading = true;
    this.svc.getAllTimeslots().subscribe({
      next: data => { this.timeslots = data; this.loading = false; },
      error: err => { this.error = err.message; this.loading = false; }
    });
  }

 onSubmit(): void {
  if (this.slotForm.invalid) return;

  const dto: AddTimeslot = {
    TIMESLOT: this.slotForm.value.timeslot,
    CREATED_BY: this.slotForm.value.createdBy,
    IS_ACTIVE: this.slotForm.value.isActive
  };

  this.svc.insertTimeslot(dto).subscribe({
    next: res => {
      alert(res.message);
      this.slotForm.reset({ timeslot: '', createdBy: '', isActive: true });
      this.loadSlots();
    },
    error: err => alert(`Insert failed: ${err.message}`)
  });
}

}
