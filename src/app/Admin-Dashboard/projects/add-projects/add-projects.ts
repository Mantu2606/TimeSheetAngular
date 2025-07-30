import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ProjectService } from '../../../Service/project-service';
import { ClientService } from '../../../Service/client-service';

@Component({
  selector: 'app-add-projects',
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],

  templateUrl: './add-projects.html',
  styleUrl: './add-projects.css'
})
export class AddProjects implements OnInit {
projectForm!: FormGroup;
  successMessage = '';
  errorMessage = '';
  clients: any[] = [];
  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router, private clientService: ClientService) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      clientId: [null, Validators.required],
      projCode: ['', Validators.required],
      projName: ['', Validators.required],
      projDesc: [''],
      createdBy: ['admin'], // Replace with actual username if needed
      isActive: [true, Validators.required]
    });
    this.loadClients();
  }

  onSubmit(): void {
    if (this.projectForm.invalid) return;

    this.projectService.addProject(this.projectForm.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        setTimeout(() => this.router.navigate(['/admin/projects']), 1000);
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to add project';
      }
    });
  }

  loadClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        console.log('Clients loaded:', this.clients);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Failed to load clients';
      }
    });
  }
}
