import { Component, computed, OnInit, signal, Inject } from '@angular/core';
import { FormsModule, NgModel, NgForm, FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { AuthNetworkService } from '../../security/auth-network-service';
import { AuthService } from '../../auth/auth-service';
import { Router } from '@angular/router';
import { UtenteDTO } from '../../models/dto';

import { email } from '@angular/forms/signals';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UtenteService } from '../../services/utente-service';


@Component({
  selector: 'app-registrazione',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatCheckboxModule],
  templateUrl: './registrazione-update.html',
  styleUrl: './registrazione-update.css',
})
export class RegistrazioneUpdate implements OnInit {
 
  // validator per controllare che password e conferma coincidano

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const passwordControl = control.get('passwordControl')?.value;
    if (password == null && passwordControl == null) return null;
    return password === passwordControl ? null : { passwordsMismatch: true };
  }


  labelSubmit = signal("Registra");

  caption = signal("Registra nuovo utente");

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
    changePassword: new FormControl(false),
    password: new FormControl(null),
    passwordControl: new FormControl(null),
    indirizzo: new FormControl(null)
  })

  modalita = computed<'create' | 'update'>(() =>
    this.authService.grant().isLogged ? 'update' : 'create'
  );

  showPasswordFields(): boolean {
    return this.modalita() === 'create' || !!this.registerUpdateForm.get('changePassword')?.value;
  }



  constructor(private networkAuthenticatioService: AuthNetworkService,
    private authService: AuthService,
    private utenteService:UtenteService,
    private routing: Router
  ) {

  }


  ngOnInit(): void {

    // add validator that checks password and confirmation match
    this.registerUpdateForm.addValidators(this.passwordsMatchValidator);

    // make password and confirmation required in create mode
    if (this.modalita() === 'create') {
      this.registerUpdateForm.get('password')?.setValidators([Validators.required]);
      this.registerUpdateForm.get('passwordControl')?.setValidators([Validators.required]);
    } else {
      this.registerUpdateForm.get('username')?.clearValidators();
      this.registerUpdateForm.get('password')?.clearValidators();
      this.registerUpdateForm.get('passwordControl')?.clearValidators();
    }
    this.registerUpdateForm.get('username')?.updateValueAndValidity();
    this.registerUpdateForm.get('password')?.updateValueAndValidity();
    this.registerUpdateForm.get('passwordControl')?.updateValueAndValidity();
    this.registerUpdateForm.updateValueAndValidity();

    if (this.modalita() === 'update') {

      this.caption.set('Aggiornamento  utente '+this.authService.grant().username);

      this.utenteService.findByUsername(this.authService.grant().username)
        .subscribe({
          next: ((resp: any) => {
            const utente = resp as UtenteDTO;
            this.registerUpdateForm.patchValue({
              username: utente.username,
              email: utente.email,
              changePassword: false,
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
        //navigo sulla pagina, non rifaccio il login perché potrei non aver riscritto la password
        //lato backend non viene consentito cambiare lo username dell'utente collegato
        this.routing.navigate(['']);
      }
      ),
      error: ((err: any) => {
        //create fallito
        this.msg.set(err.message);
      })
    });

  }

}

