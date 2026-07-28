import { Component, inject, OnInit, signal } from '@angular/core';
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

  ingredientSelection = signal<SelectableIngredient[]>([]);
  ingredientList: SelectableIngredient[] = [];

  promozioneSignalPlaceholder: { id: number; sconto: number; isActive: boolean}[] = [
    {id: 1, sconto: 10, isActive: true},
    {id: 2, sconto: 40, isActive: false}
  ]

  ngOnInit(): void {
    this.productService.list();
    this.ingredienteService.list();
    this.categoriaIngredienteService.list();
    this.tagProdottoService.list();

    this.ingredienteSignal().forEach(ingrediente => {
      this.ingredientList.push({selected: false, quantity: 1, ingrediente: ingrediente});
    });
    this.ingredientSelection.set(this.ingredientList);
  }

  newProduct = {
    nome: '',
    descrizione: '',
    imgUrl: '',
    tag: [] as string[],
    promozione: [] as string[],
    composizione: [] as string[]
  }

  onSubmit(): void{
    if(!this.newProduct.nome || !this.newProduct.composizione){
      return;
    }

    this.productService.create(this.newProduct).subscribe({
      next: () => {
        this.newProduct = {
          nome: '',
          descrizione: '',
          imgUrl: '',
          tag: [] as string[],
          promozione: [] as string[],
          composizione: [] as string[]
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
