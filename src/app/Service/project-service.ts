import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  baseUrl=`https://localhost:7160/api/Project`;

  constructor(private http: HttpClient) { }
  getAllProjects() {
  return this.http.get<Project[]>(`${this.baseUrl}/getAllProjects`);
}

updateProject(project: EditProject) {
  return this.http.put<any>(`${this.baseUrl}/updateProject`, project);
}

deleteProject(id: number) {
  return this.http.delete<any>(`${this.baseUrl}/deleteProject/${id}`);
}

addProject(project: AddProject) {
  return this.http.post<any>(`${this.baseUrl}/addProject`, project);
}

}
export interface Project {
  projId: number;
  clientId: number;
  clientName?: string;
  projCode: string;
  projName: string;
  projDesc?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;
  isActive: boolean;
}

export interface EditProject {
  projId: number;
  clientId: number;
  projCode: string;
  projName: string;
  projDesc?: string;
  updatedBy?: string;
  isActive: boolean;
}
export interface AddProject {
  projId?: number;
  clientId: number;
  projCode: string;
  projName: string;
  projDesc?: string;
  createdBy?: string;
  isActive: boolean;
}
