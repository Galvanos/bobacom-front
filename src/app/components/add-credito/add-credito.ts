import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-credito',
  imports: [MatFormFieldModule,FormsModule],
  templateUrl: './add-credito.html',
  styleUrl: './add-credito.css',
})
export class AddCredito implements OnInit {
  onSubmit() {
    
  }
  
  private readonly authService: AuthService = inject(AuthService);
  
  routing: Router = inject(Router);
   msg = signal("");

  @ViewChild('addCreditoForm') addCreditoForm!:NgForm;

  ngOnInit(): void {
    const isLogged = this.authService.grant().isLogged;
    console.log('is authenticated ' + isLogged);
    if (isLogged) {
      console.log('loggato');
    } else {
      console.log('non loggato');
    }

  }
}
