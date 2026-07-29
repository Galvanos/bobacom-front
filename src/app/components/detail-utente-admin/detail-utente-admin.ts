import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatSelectModule } from "@angular/material/select";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { UtenteDTO } from '../../models/dto';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UtenteService } from '../../services/utente-service';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';

@Component({
  selector: 'app-detail-utente-admin',
  imports: [MatFormFieldModule, MatCheckboxModule, MatSelectModule, ReactiveFormsModule,MatInputModule,MatButtonModule],
  templateUrl: './detail-utente-admin.html',
  styleUrl: './detail-utente-admin.css',
})
export class DetailUtenteAdmin implements OnInit {

  utenteService:UtenteService = inject(UtenteService);
  router:Router = inject(Router);
  authService:AuthService = inject(AuthService);

  msg = signal("");

  idUtente:number|undefined = undefined;

  adminUtenteForm: FormGroup = new FormGroup({
    username: new FormControl(null),
    email: new FormControl(null, Validators.email),
    changePassword: new FormControl(false),
    password: new FormControl(null),
    passwordControl: new FormControl(null),
    indirizzo: new FormControl(null),
    credito: new FormControl(null),
    role: new FormControl(null)
  })

  caption = signal("Aggiornamento utente");

  showPasswordFields(): boolean {
    return !!this.adminUtenteForm.get('changePassword')?.value;
  }


  ngOnInit(): void {
    const selectedUtente: UtenteDTO = history.state.utente;
    this.adminUtenteForm.patchValue({
      username: selectedUtente.username,
      email: selectedUtente.email,
      changePassword: false,
      indirizzo: selectedUtente.indirizzo,
      credito: selectedUtente.credito,
      role: selectedUtente.ruolo
    });
    this.idUtente=selectedUtente.id;

    const loggedUsername = this.authService.grant().username;

    const isSameUser:boolean = loggedUsername === selectedUtente.username;

    if(isSameUser){
      this.adminUtenteForm.get('username')?.disable();
    }else{
       this.adminUtenteForm.get('username')?.enable();
    }

  }

  onSubmit() {
    const formValue = this.adminUtenteForm.value;
    let password=undefined;
    if(formValue.password){
      password = formValue.password;
    }
    this.utenteService.updateAdmin(
      {
        username: formValue.username,
        email: formValue.email,
        password: password,
        ruolo: formValue.role,
        credito: formValue.credito,
        indirizzo: formValue.indirizzo,
        id: this.idUtente
      }).subscribe({
        next:((res:any) => {
          this.router.navigate(['']);
        }),
        error:(
          (err:any) => {
            this.msg.set(err.msg);
            console.log('error update admin',err);
        })
      })
  }
}
