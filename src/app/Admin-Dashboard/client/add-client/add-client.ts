import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../../Service/client-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-client',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-client.html',
  styleUrl: './add-client.css'
})
export class AddClient  implements OnInit {
  clientForm!: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder, private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      CLIENT_CODE: ['', Validators.required],
      CLIENT_NAME: ['', Validators.required],
      CREATED_BY: ['admin'],               // or whatever user
      CREATED_DATE: [new Date()],
      UPDATED_BY: ['admin'],
      UPDATED_DATE: [new Date()],
      IS_ACTIVE: [true]
    });

  }

  onAddClient() {
  if (this.clientForm.invalid) {
    this.message = 'Please fill all required fields.';
    return;
  }

  this.clientService.addClient(this.clientForm.value).subscribe({
    next: () => {
      this.message = 'Client added successfully.';
      this.clientForm.reset();  // optional
    },
    error: (err) => {
      console.error('Error adding client:', err.error?.errors);
      this.message = 'Failed to add client. Check required fields.';
    }
  });
}


}

