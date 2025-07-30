import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  baseUrl = `https://localhost:7160/api/Module`
  constructor(private http:HttpClient) { }
  getAllModules(): Observable<Module[]> {
  return this.http.get<Module[]>(`${this.baseUrl}/getAllModules`);
}

 getModuleById(id: number): Observable<Module> {
    return this.http.get<Module>(`${this.baseUrl}/getModuleById/${id}`);
  }

  updateModule(id: number, payload: any): Observable<{ message: string; rows: number }> {
    return this.http.put<{ message: string; rows: number }>(
      `${this.baseUrl}/updateModule/${id}`, payload
    );
  }

  getAllFunctions(): Observable<FunctionModel[]> {
    return this.http.get<FunctionModel[]>(`https://localhost:7160/api/Function/getAllFunctions`);
  }
}
export interface Module {
  moD_ID?: number;
  fuN_ID?:number;
  fuN_NAME: number;
  moD_CODE: string;
  moD_NAME: string;
  createD_BY: string;
  createD_DATE: string;
  updateD_BY?: string;
  updateD_DATE?: string;
  iS_ACTIVE: boolean;
}
export interface EditModule {
  modId: number;
  funId: number;
  modCode: string;
  modName: string;
  updatedBy: string;
  isActive: boolean;
}export interface FunctionModel {
  funId: number;
  funName: string;
}