import { Component, OnInit, ViewChild, inject, signal } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, NgForm } from '@angular/forms';
import { CreditoService } from '../../services/credito-service';
import { CreditoNetworkService } from '../../services/credito-network-service';
import { AppSettings } from '../../setting/config-model';
import { APP_SETTING } from '../../setting/token';
import { UtenteDTO } from '../../models/dto';
import { error } from 'console';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-add-credito',
  imports: [MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './add-credito.html',
  styleUrl: './add-credito.css',
})
export class AddCredito implements OnInit {
  onSubmit() {
    this.addCreditoNetworkService.addCredito({
      credit: this.addCreditoForm.value?.credit,
      secret: this.settings.creditoSecret,
      userId: undefined
    }).subscribe({
      next:((utente:UtenteDTO) =>{
        this.creditoService.setCredito(utente.credito!);
        this.routing.navigate(['']);
      }),
      error:((err)  => {
        console.log('errore add credito ',err);
      })
    })
  }

  private readonly settings: AppSettings = inject(APP_SETTING);
  private readonly authService: AuthService = inject(AuthService);
  private readonly creditoService:CreditoService = inject(CreditoService);
  private readonly addCreditoNetworkService:CreditoNetworkService = inject(CreditoNetworkService);
  
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
