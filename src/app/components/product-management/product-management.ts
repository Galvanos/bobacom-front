import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProdottoService } from '../../services/prodotto-service';
import { IngredientsService } from '../../services/ingredients-service';
import { CategoriaIngredienteService } from '../../services/categoria-ingrediente-service';
import { TagprodottoService } from '../../services/tagprodotto-service';
import { FormsModule } from '@angular/forms';

export interface SelectableIngredient {
  selected: boolean,
  quantity: number,
  ingrediente: any
}
export interface composizione {
  idProdotto: number;
  idIngrediente: number;
  quantita: number;
}
@Component({
  selector: 'app-product-management',
  imports: [FormsModule],
  templateUrl: './product-management.html',
  styleUrl: './product-management.css',
})

export class ProductManagement implements OnInit{
  private productService = inject(ProdottoService);
  private ingredienteService = inject(IngredientsService);
  private categoriaIngredienteService = inject(CategoriaIngredienteService);
  private tagProdottoService = inject(TagprodottoService);

  productSignal = this.productService.prodotto;
  ingredienteSignal = this.ingredienteService.ingredients;
  categoriaIngredienteSignal = this.categoriaIngredienteService.categorieIngredienti;
  tagProdottoSignal = this.tagProdottoService.tagProdotto;

  ingredientSelection = computed<SelectableIngredient[]>(() => {
    return this.ingredienteSignal().map(ingrediente => ({
      selected: false,
      quantity: 1,
      ingrediente: ingrediente
    }))
  });

  promozioneSignalPlaceholder: { id: number; sconto: number; isActive: boolean}[] = [
    {id: 1, sconto: 10, isActive: true},
    {id: 2, sconto: 40, isActive: false}
  ]

  ngOnInit(): void {
    this.productService.list();
    this.ingredienteService.list();
    this.categoriaIngredienteService.list();
    this.tagProdottoService.list();
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
    this.newProduct.composizione = this.ingredientSelection().filter(item => item.selected).map(item => ({
      idProdotto: 0,
      idIngrediente: item.ingrediente.id,
      quantita: item.quantity
    }))
    console.log(this.newProduct);
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
    return this.ingredientSelection().filter(item => item.selected);
  }
}
