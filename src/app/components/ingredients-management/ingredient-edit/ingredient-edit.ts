import { Component, inject, Inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IngredientsService } from '../../../services/ingredients-service';
import { FormsModule } from '@angular/forms';

interface categoria {
  id: number,
  nome: string
}

interface allergene {
  id: number,
  nome: string,
  urlIcona: string
}

interface ingrediente {
  id: number,
  nome: string,
  descrizione: string,
  quantitaStock: number,
  sovrapprezzoAggiunta: number,
  prezzoRestock: number,
  colore: string,
  allergeni: allergene[],
  categoriaIngrediente: categoria
}

@Component({
  selector: 'app-ingredient-edit',
  imports: [FormsModule],
  templateUrl: './ingredient-edit.html',
  styleUrl: './ingredient-edit.css',
})
export class IngredientEdit {
  private ingredienteService = inject(IngredientsService);
  private dialogRef = inject(MatDialogRef<IngredientEdit>);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {ingrediente: ingrediente, categorie: categoria[], allergeni: allergene[]}
  ) {
    this.newIngrediente.id = data.ingrediente.id;
    this.newIngrediente.nome = data.ingrediente.nome;
    this.newIngrediente.descrizione = data.ingrediente.descrizione;
    this.newIngrediente.quantitaStock = data.ingrediente.quantitaStock;
    this.newIngrediente.sovraprezzoAggiunta = data.ingrediente.sovrapprezzoAggiunta;
    this.newIngrediente.prezzoRestock = data.ingrediente.prezzoRestock;
    this.newIngrediente.colore = data.ingrediente.colore;
    for(const allergene of data.ingrediente.allergeni)
      this.newIngrediente.idAllergeni.push(allergene.id);
    this.newIngrediente.idCategoriaIngrediente = data.ingrediente.categoriaIngrediente.id;
  }

  editWithSuccess = signal(false);

  newIngrediente = {
    id: 0,
    nome: '',
    descrizione: '',
    quantitaStock: 0,
    sovraprezzoAggiunta: 0.2,
    prezzoRestock: 0.1,
    colore: '',
    idAllergeni: [] as number[],
    idCategoriaIngrediente: 0
  };

  close(): void {
    this.dialogRef.close();
  }

  onIngredienteSubmit(): void {
    this.ingredienteService.update(this.newIngrediente).subscribe({
      next: () => {}});
    this.editWithSuccess.set(true);
  }
}
