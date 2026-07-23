import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule, NgModel,NgForm, FormGroup, FormControl, Validators,ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthNetworkService } from '../../security/auth-network-service';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { UtenteDTO } from '../../models/dto';
import { UtenteService } from '../../service/utente-service';

@Component({
  selector: 'app-registrazione',
  imports: [MatFormFieldModule, MatInputModule, FormsModule,ReactiveFormsModule],
  templateUrl: './registrazione-update.html',
  styleUrl: './registrazione-update.css',
})
export class RegistrazioneUpdate implements OnInit {

  labelSubmit=signal("Registra");

  /*
  export interface UtenteDTO{
  id:number,
  username:string,
  email:string | null,
  password:string | null,
  ruolo:string | null,
  credito:number | null,
  indirizzo:string | null,
  ordini:any[] | null
} 
   */

   registerUpdateForm: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null),
    indirizzo: new FormControl(null)
  })

   modalita = computed<'create' | 'update'>(() => 
    this.authService.grant().isLogged ? 'update' : 'create'
  );

  constructor(private networkAuthenticatioService:AuthNetworkService,
       private authService:AuthService,
       private utenteService:UtenteService,
       private routing:Router
  ){

  }
  ngOnInit(): void {
    
    if(this.modalita() === 'update'){
    }
  }

 

  

  onSubmit(){
    
  }



}
