import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class TimeslotService {
  private baseUrl = 'https://localhost:7160/api/Timeslot';
  constructor(private http: HttpClient) { }
  getAllTimeslots(): Observable<Timeslot[]> {
    return this.http.get<Timeslot[]>(`${this.baseUrl}/getAllTimeslots`);
  }

  updateTimeslot(id: number, slot: Timeslot): Observable<{ message: string; rows: number }> {
    return this.http.put<{ message: string; rows: number }>(`${this.baseUrl}/updateTimeslot/${id}`, slot);
  }

  deleteTimeslot(id: number): Observable<{ message: string; rows: number }> {
    return this.http.delete<{ message: string; rows: number }>(
      `${this.baseUrl}/deleteSlot/${id}`
    );
  }

  insertTimeslot(model: Partial<AddTimeslot>): Observable<{ message: string; rows: number }> {
  return this.http.post<{ message: string; rows: number }>(
    `${this.baseUrl}/insertTimeslots`,
    model
  );
}

}

export interface Timeslot {
  sloT_ID: number;
  timeslot: string;
  createD_BY: string;
  createD_DATE: string;
  updateD_BY?: string;
  updateD_DATE?: string | null;
  iS_ACTIVE: boolean;
}

export interface AddTimeslot {
   TIMESLOT: string;
  CREATED_BY: string;
  IS_ACTIVE: boolean;
}