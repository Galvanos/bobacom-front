import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProdottoService } from '../../services/prodotto-service';
import { IngredientsService } from '../../services/ingredients-service';
import { CategoriaIngredienteService } from '../../services/categoria-ingrediente-service';
import { TagprodottoService } from '../../services/tagprodotto-service';
import { FormsModule } from '@angular/forms';
import { ingrediente } from '../../models/ingrediente.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Promozione } from '../../services/promozione';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ProductEdit } from './product-edit/product-edit';

interface categoriaIngrediente{
  id: number,
  nome: string
}
interface SelectableIngredient {
  selected: boolean,
  quantity: number,
  ingrediente: any
}
interface composizione {
  idProdotto: number;
  idIngrediente: number;
  quantita: number;
}
@Component({
  selector: 'app-product-management',
  imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatSelectModule],
  templateUrl: './product-management.html',
  styleUrl: './product-management.css',
})

export class ProductManagement implements OnInit{
  private snackbar = inject(MatSnackBar);  
  private dialog = inject(MatDialog); 
  private productService = inject(ProdottoService);
  private ingredienteService = inject(IngredientsService);
  private categoriaIngredienteService = inject(CategoriaIngredienteService);
  private tagProdottoService = inject(TagprodottoService);
  private promozioneService = inject(Promozione);

  productSignal = this.productService.prodotto;
  ingredienteSignal = this.ingredienteService.ingredients;
  categoriaIngredienteSignal = this.categoriaIngredienteService.categorieIngredienti;
  tagProdottoSignal = this.tagProdottoService.tagProdotto;
  promozioneSignal = this.promozioneService.promozione;

  ingredientSelection = computed<Map<string, SelectableIngredient[]>>(() => {
    const map = new Map<string, SelectableIngredient[]>();

    for (const ing of this.ingredienteSignal()) {
      const list = map.get(ing.categoriaIngrediente.nome) ?? [];
      list.push({selected: false, quantity: 1, ingrediente: ing});
      map.set(ing.categoriaIngrediente.nome, list);
    }
    return map;
  })

  ngOnInit(): void {
    this.productService.list();
    this.ingredienteService.list();
    this.categoriaIngredienteService.list();
    this.tagProdottoService.list();
    this.promozioneService.list();
    console.log(this.ingredientSelection);
  }

  newProduct = {
    nome: '',
    descrizione: '',
    imgUrl: '',
    tag: [] as string[],
    promozione: [] as string[],
    composizione: [] as composizione[]
  }

  onSubmit(): void{
    if(!this.newProduct.nome){
      return;
    }
    const composArray = [] as composizione[];
    this.ingredientSelection().forEach((value, key) => {
      for(const ingS of value){
        if(ingS.selected)
          composArray.push({
            idProdotto: 0,
            idIngrediente: ingS.ingrediente.id,
            quantita: ingS.quantity
          });
      }
    })

    this.newProduct.composizione = composArray;
    this.productService.create(this.newProduct).subscribe({
      next: () => {
        this.newProduct = {
          nome: '',
          descrizione: '',
          imgUrl: '',
          tag: [] as string[],
          promozione: [] as string[],
          composizione: [] as composizione[]
        }
      }
    })
  }

  toggleSelection(item: SelectableIngredient) {
    item.selected = !item.selected;
    if (!item.selected) {
      item.quantity = 1; // Reset default when unchecked
    }
  }

  getSelectedItems() {
    const composArray = [] as SelectableIngredient[];
      this.ingredientSelection().forEach((value, key) => {
        for(const ingS of value){
          if(ingS.selected)
            composArray.push(ingS);
        }
      })

    return composArray;
  }

  edit(prod: any): void {
      this.dialog.open(ProductEdit, {
            width: '1000px',
            data: { prodotto: prod,
                    ingredienti: this.ingredienteSignal(),
                    categorie: this.categoriaIngredienteSignal(),
                    tag: this.tagProdottoSignal(),
                    promo: this.promozioneSignal()
            }
          });
    }
  
    del(id: number): void {
      this.productService.delete(id.toFixed(0)).subscribe({
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
