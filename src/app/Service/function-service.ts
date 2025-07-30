import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {
baseUrl=`https://localhost:7160/api/Function`
  constructor(private http:HttpClient) { }
  getAllFunctions(): Observable<FunctionModel[]> {
  return this.http.get<FunctionModel[]>(`${this.baseUrl}/getAllFunction`);
}

insertFunction(func: FunctionModel): Observable<any> {
  return this.http.post(`${this.baseUrl}/insertFunction`, func);
}

updateFunction(id: number, func: FunctionModel): Observable<any> {
  return this.http.put(`${this.baseUrl}/updateFunctions/${id}`, func);
}

getFunctionById(id: number): Observable<FunctionModel> {
  return this.http.get<FunctionModel>(`${this.baseUrl}/getFunctionById/${id}`);
}

deleteFunction(id: number) {
  return this.http.delete<any>(`${this.baseUrl}/deleteFunction/${id}`);
}
}

export interface FunctionModel {
  fuN_ID: number;
  rolE_ID: number;
  rolE_NAME: string;
  fuN_CODE: string;
  fuN_NAME: string;
  createD_BY: string;
  createD_DATE: Date;
  updateD_BY?: string;
  updateD_DATE?: Date | null;
  iS_ACTIVE: boolean;
}

