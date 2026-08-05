import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { StockOperationsService } from '../../services/stock-operations-service';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IngredientsService } from '../../services/ingredients-service';
import { CategoriaIngredienteService } from '../../services/categoria-ingrediente-service';
import { ProdottoService } from '../../services/prodotto-service';
import { AllergeniService } from '../../services/allergeni-service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-stock-management',
  imports: [MatCardModule, MatFormFieldModule, MatDividerModule, MatSelectModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './stock-management.html',
  styleUrl: './stock-management.css',
})
export class StockManagement implements OnInit{

  private stockManagementService = inject(StockOperationsService);
  private ingredienteService = inject(IngredientsService);
  private categoriaIngredienteService = inject(CategoriaIngredienteService);
  private prodottoService = inject(ProdottoService);
  private allergeniService = inject(AllergeniService);

  stockOperationsSignal = this.stockManagementService.stockOperations;
  ingredienteSignal = this.ingredienteService.ingredients;
  categoriaIngredienteSignal = this.categoriaIngredienteService.categorieIngredienti;
  prodottoSignal = this.prodottoService.prodotto;
  allergeniSignal = this.allergeniService.allergeni;

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0].split('-').reverse().join('/');
  }

  ngOnInit(): void {
    this.stockManagementService.list();
    this.ingredienteService.list();
    this.categoriaIngredienteService.list();
    this.prodottoService.list();
    this.allergeniService.list();
  }

  newOperation = {
    idIngrediente: '',
    deltaQuantita: 0,
    causale: '',
    data: this.getTodayString()
  };
  newIngrediente = {
    nome: '',
    descrizione: '',
    quantitaStock: 0,
    sovraprezzoAggiunta: 0.2,
    prezzoRestock: 0.1,
    colore: '',
    idAllergene: [] as string[],
    idCategoriaIngrediente: 0
  };
  allergeniString: string = '';
  newProdotto = {
    nome: '',
    descrizione: '',
    imgUrl: '',
    idTag: [] as string[],
    idComposizione: [] as string[],
    idPromozione: [] as string[]
  }

  onOperazioneSubmit(): void {
    if(!this.newOperation.idIngrediente || !this.newOperation.data) {
      return;
    }

    this.stockManagementService.create(this.newOperation).subscribe({
      next: () => {
        this.newOperation = {
          idIngrediente: '',
          deltaQuantita: 0,
          causale: '',
          data: this.getTodayString()
        };
      },
      error: (err) => console.error('Creazione operazione fallita:', err)
    });
  }

  onIngredienteSubmit(): void {
    if(!this.newIngrediente.nome || !this.newIngrediente.idCategoriaIngrediente) {
      return;
    }

    this.ingredienteService.create(this.newIngrediente).subscribe({
      next: () => {
        this.newIngrediente = {          
          nome: '',
          descrizione: '',
          quantitaStock: 0,
          sovraprezzoAggiunta: 0,
          prezzoRestock: 0,
          colore: '',
          idAllergene: [] as string[],
          idCategoriaIngrediente: 0
        }
      }
    })
  }

}