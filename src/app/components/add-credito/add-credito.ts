import { Component, ElementRef, OnInit, ViewChild, inject, signal } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth-service';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, NgForm } from '@angular/forms';
import { CreditoService } from '../../services/credito-service';
import { CreditoNetworkService } from '../../services/credito-network-service';
import { AppSettings } from '../../setting/config-model';
import { APP_SETTING } from '../../setting/token';
import { StripedUtenteDTO, UtenteDTO } from '../../models/dto';
import { error } from 'console';
import { MatInputModule } from '@angular/material/input';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { from, map, switchMap } from 'rxjs';

@Component({
  selector: 'app-add-credito',
  imports: [MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './add-credito.html',
  styleUrl: './add-credito.css',
})
export class AddCredito implements OnInit {

  @ViewChild('cardElement') cardElementRef!: ElementRef;
  
  stripe: Stripe | null = null;
  card: StripeCardElement | null = null;

  // Stato dell'interfaccia gestito con i Signal
  isProcessing = signal<boolean>(false);
  paymentSuccess = signal<boolean>(false);

  onSubmit() {
    if (!this.stripe || !this.card) return;

    // Aggiorniamo lo stato tramite i Signal
    this.isProcessing.set(true);
    this.paymentSuccess.set(false);


    this.addCreditoNetworkService.addCredito({
      credit: this.addCreditoForm.value?.credit,
      userId: undefined
    }).pipe(
        switchMap((stripedUser) => {
          // 1. Facciamo la chiamata a Stripe
          const stripeCall$ = from(this.stripe!.confirmCardPayment(stripedUser.clientSecret!, {
            payment_method: {
              card: this.card!,
              billing_details: { email: stripedUser.email }
            },
          }));

          // 2. MAGIA: Usiamo .pipe(map(...)) SULLA chiamata interna
          // per unire il risultato di Stripe con quello del backend
          return stripeCall$.pipe(
            map((stripeResult) => {
              return { 
                stripedUser: stripedUser, // Preserviamo l'oggetto originale intero
                stripeData: stripeResult // Manteniamo il risultato di Stripe
              };
            })
          );
        })
      )
      .subscribe({
        next: (combinedResult) => {
          this.isProcessing.set(false);
          
          // Ora hai accesso a entrambi gli oggetti!
          const { stripedUser, stripeData } = combinedResult;
          
          if (stripeData.error) {
            this.msg.set(stripeData.error.message || 'Errore di pagamento');
          } else if (stripeData.paymentIntent?.status === 'succeeded') {
            this.paymentSuccess.set(true);
            

            this.creditoService.setCredito(stripedUser.credito!);
            this.routing.navigate(['']);
            this.card?.clear();
          }
        },
        error: (err) => {
          this.isProcessing.set(false);
          this.msg.set('Errore di comunicazione con il server.');
          console.error(err);
        }
      });
      
      /*
      .subscribe({
      next:((utente:StripedUtenteDTO) =>{
        this.creditoService.setCredito(utente.credito!);
        this.routing.navigate(['']);
      }),
      error:((err)  => {
        console.log('errore add credito ',err);
      })
    })

    //*/
  }

  private readonly settings: AppSettings = inject(APP_SETTING);
  private readonly authService: AuthService = inject(AuthService);
  private readonly creditoService:CreditoService = inject(CreditoService);
  private readonly addCreditoNetworkService:CreditoNetworkService = inject(CreditoNetworkService);
  
  routing: Router = inject(Router);
   msg = signal("");

  @ViewChild('addCreditoForm') addCreditoForm!:NgForm;

  ngOnInit(): void {
   from(loadStripe('pk_test_51U13hXCWADBZ0VKwrFgp5dOYGPrbM1bKWn8MH5Ti1RmA4h2YYgezdywgUqEyhFxJQNiFNilAmT0SQW0Btw19eMJd009uuFZSv1')).subscribe((stripeObj) => {
      this.stripe = stripeObj;
      const elements = this.stripe?.elements();
      
      if (elements) {
        this.card = elements.create('card');
        this.card.mount(this.cardElementRef.nativeElement);
      }
    });
  }
}
