import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { clients, ClientService } from '../../Service/client-service';

@Component({
  selector: 'app-client',
  imports: [HttpClientModule, ReactiveFormsModule, CommonModule],
  templateUrl: './client.html',
  styleUrl: './client.css'
})
export class Client implements OnInit {
clients: clients[] = [];
  errorMessage = '';
  message: any;
  constructor(private clientService: ClientService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load clients';
      }
    });
  }

  // client.component.ts
deleteClient(id: number): void {
  if (confirm('Are you sure you want to delete this client?')) {
    this.clientService.deleteClient(id).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.message = res.message; // show success message
          this.loadClients();       // refresh the list
        } else {
          this.message = res.message; // show not-found or other backend message
        }
      },
      error: (error) => {
        // If backend returns detailed error message
        if (error.error && error.error.message) {          
          this.message = 'An unexpected error occurred while deleting the client.';
        }
      }
    });
  }
}


// client.component.ts
editClient(id: number): void {
  if (!id) {
    console.error('Client ID is missing');
    return;
  }

  this.router.navigate(['/admin/clients/edit', id]);
}

}
