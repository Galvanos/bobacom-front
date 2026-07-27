import { Component, OnInit, inject } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-add-credito',
  imports: [MatFormFieldModule],
  templateUrl: './add-credito.html',
  styleUrl: './add-credito.css',
})
export class AddCredito implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
msg() {
throw new Error('Method not implemented.');
}
registrazione() {
throw new Error('Method not implemented.');
}
  private readonly authService:AuthService = inject(AuthService);
  routing:Router = inject(Router);
loginForm: any;



  ngOnInit(): void {
    const isLogged = this.authService.grant().isLogged;
    console.log('is authenticated '+isLogged);
    if(isLogged){
      console.log('loggato');
    }else{
      console.log('non loggato');
    }

  }
}
