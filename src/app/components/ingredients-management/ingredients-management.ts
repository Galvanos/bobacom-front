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
import { MatDialog } from '@angular/material/dialog';
import { IngredientEdit } from './ingredient-edit/ingredient-edit';

@Component({
  selector: 'app-stock-management',
  imports: [MatCardModule, MatFormFieldModule, MatDividerModule, MatSelectModule, CommonModule, FormsModule],
  templateUrl: './ingredients-management.html',
  styleUrl: './ingredients-management.css',
})
export class IngredientsManagement implements OnInit{

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
          width: '700px',
          data: ing
        });
  }

  del(id: number): void {
    this.ingredienteService.delete(String(id));
  }

}