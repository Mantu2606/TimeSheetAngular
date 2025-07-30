import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Timeslot, TimeslotService } from '../../../Service/timeslot-service';

@Component({
  selector: 'app-edit-time-slot',
  imports: [HttpClientModule,CommonModule, FormsModule],
  templateUrl: './edit-time-slot.html',
  styleUrl: './edit-time-slot.css'
})
export class EditTimeSlot implements OnInit{
 timeslots: Timeslot[] = [];
  editingSlotId: number | null = null;
  editedTimeslot = '';

  constructor(private svc: TimeslotService) {}

  ngOnInit(): void {
    this.loadSlots();
  }

  loadSlots(): void {
    this.svc.getAllTimeslots().subscribe(data => this.timeslots = data);
  }

  onEditClick(slot: Timeslot): void {
    this.editingSlotId = slot.sloT_ID;
    this.editedTimeslot = slot.timeslot;
  }

  saveEdit(): void {
    const slot = this.timeslots.find(s => s.sloT_ID === this.editingSlotId)!;
    slot.timeslot = this.editedTimeslot;
    this.svc.updateTimeslot(slot.sloT_ID, slot).subscribe(() => {
      alert('Updated!');
      this.editingSlotId = null;
    });
  }

  cancelEdit(): void {
    this.editingSlotId = null;
  }
}
