import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServices {
   private moduleApi = 'https://localhost:7275/api/Module' ; 
   private projectApi = 'https://localhost:7275/api/Project' ; 
   private timeslotApi ='https://localhost:7275/api/Timeslot'; 
   private timeSheetApi = 'https://localhost:7275/api/Timesheet' ; 

   constructor(private http : HttpClient,private route : Router){}
   
   getModulesByFunctionId(funId : number){
    return this.http.get<any[]>(`${this.moduleApi}/ByFunction/${funId}`); 
   }
  
   getClientProject(){
     return this.http.get<any[]>(`${this.projectApi}/getClientWithProject`)
   }
   getTimeSlot(){
     return this.http.get<any[]>(this.timeslotApi);
   }
   postTimeSheet(timesheet:timeSheetData){
       return this.http.post(`https://localhost:7275/api/Timesheet/TimeSheetPost`,timesheet);
   }
   getTimesheetsByEmployee(empId: number) {
  return this.http.get<any[]>(`${this.timeSheetApi}/byEmployee/${empId}`);
}

// sam bhai
 getAdminTimesheets(): Observable<TimesheetAdmin[]> {
    return this.http.get<TimesheetAdmin[]>(`https://localhost:7160/api/Timesheet/getAllTimesheetsAdmin`);
  }
}
export interface ProjectList{
  clientId :number ; 
  projId : number ; 
  projName : string; 
} 
export interface TimeSlotList{
   sloT_ID: number,
   timeslot: string,
}


export interface timeSheetData {
  emP_ID: number;
  sloT_ID: number;
  hours: number;
  proJ_ID: number;
  fuN_ID: number;
  moD_ID: number;
  timE_FROM: string;
  timE_TO: string;
  timesheeT_DESC?: string;
  createD_BY: string;
  timesheeT_DATE : string
}

  export interface TimesheetAdmin {
  timesheetDate: string;
  empName: string;
  timeSlot: string;
  hours: number;
  projectName: string;
  functionName: string;
  moduleName: string;
  timeFrom: string;
  timeTo: string;
  description?: string | null;
  createdBy: string;
  createdDate: string;
}

