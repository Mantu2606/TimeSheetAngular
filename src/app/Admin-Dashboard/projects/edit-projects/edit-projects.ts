import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../Service/project-service';
import { ClientService } from '../../../Service/client-service';

@Component({
  selector: 'app-edit-projects',
    imports: [HttpClientModule, ReactiveFormsModule, CommonModule],

  templateUrl: './edit-projects.html',
  styleUrl: './edit-projects.css'
})
export class EditProjects implements OnInit {
 projectForm!: FormGroup;
  projectId!: number;
  successMessage = '';
  errorMessage = '';
  clients: any[] = [];
  clientsList: any[] = [];
  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.projectId = Number(this.route.snapshot.paramMap.get('id'));
    this.initForm();
    this.loadProject();
    this.loadClients();
  }

  initForm(): void {
    this.projectForm = this.fb.group({
      projId: [this.projectId],
      clientId: [null, Validators.required],
      clientName: ['', Validators.required],
      projCode: ['', Validators.required],
      projName: ['', Validators.required],
      projDesc: [''],
      updatedBy: ['admin'], // Replace with logged-in user
      isActive: [true, Validators.required]
    });
  }

  loadProject(): void {
    this.projectService.getAllProjects().subscribe({
      next: (projects) => {
        const project = projects.find(p => p.projId === this.projectId);
        if (project) {
          this.projectForm.patchValue(project);
        } else {
          this.errorMessage = 'Project not found';
        }
      },
      error: () => this.errorMessage = 'Failed to load project'
    });
  }

  onSubmit(): void {
    if (this.projectForm.invalid) return;

    this.projectService.updateProject(this.projectForm.value).subscribe({
      next: (res) => {
        this.successMessage = res.message;
        setTimeout(() => this.router.navigate(['/admin/projects']), 1000);
      },
      error: (err) => this.errorMessage = err?.error?.message || 'Update failed'
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
