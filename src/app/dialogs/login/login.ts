import { Component, signal, ViewChild } from '@angular/core';
import { FormsModule, NgModel,NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthNetworkService } from '../../security/auth-network-service';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { UtenteDTO } from '../../models/dto';

@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  msg = signal("");
  @ViewChild('loginForm') loginForm!:NgForm;


  constructor(private networkAuthService:AuthNetworkService,
              private auth:AuthService,
              private routing:Router
  ){

  }


  onSubmit(){
    this.networkAuthService.login({
      username:this.loginForm.value.userName,
      password:this.loginForm.value.password
    }).subscribe({
      next: ((r:UtenteDTO) => {
        this.msg.set("");
        this.auth.setAuthenticated(r)
        this.routing.navigate(['']);
      }),
      error: ((r:any) => {
        this.msg.set(r.error.msg);
      })
    })
  }

}
