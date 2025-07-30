import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { Project, ProjectService } from '../../Service/project-service';

@Component({
  selector: 'app-projects',
  imports: [CommonModule,HttpClientModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects  implements OnInit {
projects: Project[] = [];
  errorMessage = '';
  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getAllProjects().subscribe({
      next: (res) => {
        this.projects = res;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to load projects';
      }
    });
  }

  editProject(id: number): void {
  this.router.navigate(['/admin/projects/edit', id]);
}

deleteProject(id: number): void {
  if (confirm('Are you sure you want to delete this project?')) {
    this.projectService.deleteProject(id).subscribe({
      next: (res) => {
        alert(res.message);
        this.loadProjects(); // Refresh list
      },
      error: (err) => {
        alert(err?.error?.message || 'Delete failed');
      }
    });
  }
}

}
