import { Component, inject, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IngredientsService } from '../../services/ingredients-service';
import { CategoriaIngredienteService } from '../../services/categoria-ingrediente-service';
import { AllergeniService } from '../../services/allergeni-service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { IngredientEdit } from './ingredient-edit/ingredient-edit';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-management',
  imports: [MatCardModule, MatFormFieldModule, MatDividerModule, MatSelectModule, CommonModule, FormsModule, MatButtonModule],
  templateUrl: './ingredients-management.html',
  styleUrl: './ingredients-management.css',
})
export class IngredientsManagement implements OnInit{

  private snackbar = inject(MatSnackBar);
  private dialog = inject(MatDialog); 
  private ingredienteService = inject(IngredientsService);
  private categoriaIngredienteService = inject(CategoriaIngredienteService);
  private allergeniService = inject(AllergeniService);

  ingredienteSignal = this.ingredienteService.ingredients;
  categoriaIngredienteSignal = this.categoriaIngredienteService.categorieIngredienti;
  allergeniSignal = this.allergeniService.allergeni;

  ngOnInit(): void {
    this.ingredienteService.list();
    this.categoriaIngredienteService.list();
    this.allergeniService.list();
  }

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

  edit(ing: any): void {
    this.dialog.open(IngredientEdit, {
          width: '1000px',
          data: {ingrediente: ing, categorie: this.categoriaIngredienteSignal(), allergeni: this.allergeniSignal()}
        });
  }

  del(id: number): void {
    this.ingredienteService.delete(id.toFixed(0)).subscribe({
      next: () => {
        this.snackbar.open('Ingredient deleted!', 'Close', {
          duration: 2000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        });
      }
    });
  }

}