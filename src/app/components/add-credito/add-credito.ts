import { Component, OnInit, inject } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-add-credito',
  imports: [],
  templateUrl: './add-credito.html',
  styleUrl: './add-credito.css',
})
export class AddCredito implements OnInit {
  private readonly authService:AuthService = inject(AuthService);
  routing:Router = inject(Router);

  ngOnInit(): void {
    console.log('is authenticated '+this.authService.grant().isLogged);
    if(this.authService.grant().isLogged){
      console.log('loggato');
    }else{
      console.log('non loggato');
      this.routing.navigate(['login']);
    }

  }
}
