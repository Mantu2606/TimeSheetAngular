import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  
  constructor(private http: HttpClient) { }
  getAllRoles() {
  return this.http.get<Role[]>('https://localhost:7160/api/Role/getAllRoles');
}

getRoleById(id: number) {
  return this.http.get<Role>(`https://localhost:7160/api/Role/getRoleById/${id}`);
}

addRole(role: Role) {
  return this.http.post<any>('https://localhost:7160/api/Role/addRole', role);
}

updateRole(role: Role) {
  return this.http.put<any>('https://localhost:7160/api/Role/updateRole', role);
}

deleteRole(id: number) {
  return this.http.delete<any>(`https://localhost:7160/api/Role/deleteRole/${id}`);
}

}

export interface Role {
  roleId: number;
  roleCode: string;
  roleName: string;
  createdBy?: string;
  createdDate?: Date;
  updatedBy?: string;
  updatedDate?: Date;
  isActive: boolean;
}

