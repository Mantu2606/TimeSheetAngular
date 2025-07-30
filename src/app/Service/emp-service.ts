import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpService {
  baseUrl = 'https://localhost:7275/api/Employee';

  constructor(private http: HttpClient) { }
  getAllEmployees(): Observable<employee[]> {
  return this.http.get<employee[]>(`${this.baseUrl}/getAllEmployees`);
}

updateEmployee(emp: employee): Observable<any> {
  return this.http.put(`${this.baseUrl}/updateEmployee`, emp);
}

deleteEmployee(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/deleteEmployee/${id}`);
}

addEmployee(empData: any) {
  return this.http.post<any>(`${this.baseUrl}/addEmployee`, empData);
}

}

export interface employee {
  empId: number;
  roleId: number;
  empCode: string;
  empName: string;
  empMobileNo: number;
  empEmailId: string;
  empPassword?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;
  isActive: boolean;
  lineManagerId?: number;
  lineManagerEmailId?: string;
  empLastLogin?: Date;
}
