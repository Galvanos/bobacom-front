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

@Component({
  selector: 'app-stock-management',
  imports: [MatCardModule, MatFormFieldModule, MatDividerModule, MatSelectModule, CommonModule, FormsModule],
  templateUrl: './stock-management.html',
  styleUrl: './stock-management.css',
})
export class StockManagement implements OnInit{

  private stockManagementService = inject(StockOperationsService);
  private ingredienteService = inject(IngredientsService);
  private categoriaIngredienteService = inject(CategoriaIngredienteService);

  stockOperationsSignal = this.stockManagementService.stockOperations;
  ingredienteSignal = this.ingredienteService.ingredients;
  categoriaIngredienteSignal = this.categoriaIngredienteService.categorieIngredienti;

  private getTodayString(): string {
    return new Date().toISOString().split('T')[0].split('-').reverse().join('/');
  }

  ngOnInit(): void {
    this.stockManagementService.list();
    this.ingredienteService.list();
    this.categoriaIngredienteService.list();
  }

  selectedIngredientId: string = '';

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
    sovrapprezzoAggiunta: 0.2,
    prezzoRestock: 0.1,
    colore: '',
    idAllergene: [] as string[],
    idCategoria: 0
  };
  allergeniString: string = '';

  onSubmit(): void {
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
    if(!this.newIngrediente.nome || !this.newIngrediente.idCategoria) {
      return;
    }
    this.newIngrediente.idAllergene = this.allergeniString.split(',');

    this.ingredienteService.create(this.newIngrediente).subscribe({
      next: () => {
        this.newIngrediente = {          
          nome: '',
          descrizione: '',
          quantitaStock: 0,
          sovrapprezzoAggiunta: 0,
          prezzoRestock: 0,
          colore: '',
          idAllergene: [],
          idCategoria: 0
        }
      }
    })
  }

}