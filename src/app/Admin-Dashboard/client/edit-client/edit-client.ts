import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../Service/client-service';

@Component({
  selector: 'app-edit-client',
   imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-client.html',
  styleUrl: './edit-client.css'
})
export class EditClient  implements OnInit {
  clientForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    // Step 1: Initialize the form
    this.clientForm = this.fb.group({
  clienT_Id: [0],
  clienT_CODE: ['', Validators.required],
  clienT_NAME: ['', Validators.required],
  createD_BY: [''], // Optional
  createD_DATE: [new Date()], // Optional
  updateD_BY: ['admin'],
  updateD_DATE: [new Date()],
  iS_ACTIVE: [true]
});


    // Step 2: Get ID from route and load client
    const clientId = +this.route.snapshot.paramMap.get('id')!;
    if (clientId) {
      this.loadClientById(clientId);
    }
  }

  // Step 3: Load client and patch the form
  loadClientById(id: number): void {
    this.clientService.getClientById(id).subscribe({
      next: (client) => {
        this.clientForm.patchValue(client);
      },
      error: (err) => {
        console.error('Error loading client:', err);
        alert('Client not found');
      }
    });
  }

  // Step 4: Submit form
  onSubmit(): void {
    if (this.clientForm.valid) {
      this.clientService.updateClient(this.clientForm.value).subscribe({
        next: (res) => {
          alert(res.message);
          this.router.navigate(['/admin/clients']); // Navigate back

        },
        error: (err) => {
          console.error(err);
          alert('Update failed!');

        }
      });
    }
  }
}
