import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface clients {
  clienT_Id: number;
  clienT_CODE: string;
  clienT_NAME: string;
  createD_BY?: string;
  createD_DATE: string;
  updateD_BY?: string;
  updateD_DATE: string;
  iS_ACTIVE: boolean;
}

export interface EditClient {
  cliclienT_Id: number;
  clienT_CODE: string;
  clienT_NAME: string;
  createD_BY?: string;          // optional
  createD_DATE?: Date;          // optional
  updateD_BY?: string;
  updateD_DATE?: Date;          // optional
  iS_ACTIVE: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class ClientService {
  baseUrl = `https://localhost:7275/api`;

  constructor(private http: HttpClient) { }
  getAllClients(): Observable<clients[]> {
  return this.http.get<clients[]>(`${this.baseUrl}/Client/getAllClients`);
}

// client.service.ts
updateClient(client: EditClient): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/Client/updateClient`, client);
}

// client.service.ts
deleteClient(id: number) {
  return this.http.delete<any>(`${this.baseUrl}/Client/deleteClient/${id}`);
}

getClientById(id: number): Observable<clients> {
  return this.http.get<clients>(`${this.baseUrl}/Client/getClientById/${id}`);
}

addClient(clientData: any) {
  return this.http.post<any>('https://localhost:7275/api/Client/addClient', clientData);
}

}
