import { Component, inject, OnInit } from '@angular/core';
import { Promozione } from '../../services/promozione';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ProdottoService } from '../../services/prodotto-service';

@Component({
  selector: 'app-promozione-management',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './promozione-management.html',
  styleUrl: './promozione-management.css',
})
export class PromozioneManagement implements OnInit{
  
  promozioneService = inject(Promozione);
  prodottoService = inject(ProdottoService);

  promozioniSignal = this.promozioneService.promozione;
  prodottoSignal = this.prodottoService.prodotto;
  
  ngOnInit(): void {
    this.promozioneService.list();
    this.prodottoService.list();
  }

  newPromozione = {
    id: 0,
    sconto: 0,
    isActive: false,
    prodotto: [] as number[]
  }

  onPromozioneSubmit(): void {
    this.promozioneService.create(this.newPromozione).subscribe({
      next: () => {
        this.newPromozione = {          
          id: 0,
          sconto: 0,
          isActive: false,
          prodotto: []
        }
      }
    })
  }
}
