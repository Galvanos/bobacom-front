import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule, NgModel, NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthNetworkService } from '../../security/auth-network-service';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { UtenteDTO } from '../../models/dto';
import { UtenteService } from '../../service/utente-service';
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-registrazione',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './registrazione-update.html',
  styleUrl: './registrazione-update.css',
})
export class RegistrazioneUpdate implements OnInit {

  labelSubmit = signal("Registra");

  msg = signal("");

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
    passwordControl: new FormControl(null),
    indirizzo: new FormControl(null)
  })

  modalita = computed<'create' | 'update'>(() =>
    this.authService.grant().isLogged ? 'update' : 'create'
  );

  constructor(private networkAuthenticatioService: AuthNetworkService,
    private authService: AuthService,
    private utenteService: UtenteService,
    private routing: Router
  ) {

  }


  ngOnInit(): void {
    if (this.modalita() === 'update') {
      this.utenteService.findByUsername(this.authService.grant().username)
        .subscribe({
          next: ((resp: any) => {
            const utente = resp as UtenteDTO;
            this.registerUpdateForm.patchValue({
              username: utente.username,
              email: utente.email,
              indirizzo: utente.indirizzo
            }
            )
            this.labelSubmit.set("Aggiorna");
          }),
          error: ((err: any) => {
            this.msg.set(err.message);
          })
        })
    }
  }

  onSubmit() {
    switch (this.modalita()) {
      case 'create':
        this.onSubmitCreate();
        break;
      case 'update':
        this.onSubmitUpdate();
        break;
    }
  }

  onSubmitCreate() {
    //TODO da gestire password e conferma password
    this.utenteService.create(
      {
        username: this.registerUpdateForm.value.username,
        email: this.registerUpdateForm.value.email,
        password: this.registerUpdateForm.value.password,
        ruolo: undefined,
        credito: undefined,
        indirizzo: this.registerUpdateForm.value.indirizzo,
        id: undefined
      }
    ).subscribe({
      next: ((resp: any) => {
        //a subscribe correttamente effettuato faccio login con l'utente stesso
        this.networkAuthenticatioService.login({
          username: this.registerUpdateForm.value.username,
          password: this.registerUpdateForm.value.password
        }
        ).subscribe({
          next: ((resp: any) => {
            //login ha avuto successo, vado nella home
            this.routing.navigate(['']);
          }),
          error: ((err: any) => {
            //login fallito
            this.msg.set(err.message);
          })
        })

      }),
      error: ((err: any) => {
        //create fallito
        this.msg.set(err.message);
      })
    });

  }

  onSubmitUpdate() {
    //TODO da gestire password e conferma password e i campi non valorizzati
    const formValue = this.registerUpdateForm.value;

     this.utenteService.update(
      {
        username: formValue.username,
        email: this.registerUpdateForm.value.email,
        password: formValue.password,
        ruolo: undefined,
        credito: undefined,
        indirizzo: formValue.indirizzo,
        id: undefined
      }
    ).subscribe({
      next: ((resp: any) => {
        //a subscribe correttamente effettuato faccio login con l'utente stesso
        this.networkAuthenticatioService.login({
          username: this.registerUpdateForm.value.username,
          password: this.registerUpdateForm.value.password
        }
        ).subscribe({
          next: ((resp: any) => {
            //login ha avuto successo, vado nella home
            this.routing.navigate(['']);
          }),
          error: ((err: any) => {
            //login fallito
            this.msg.set(err.message);
          })
        })

      }),
      error: ((err: any) => {
        //create fallito
        this.msg.set(err.message);
      })
    });

  }

}

