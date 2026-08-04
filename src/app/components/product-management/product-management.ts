import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ProdottoService } from '../../services/prodotto-service';
import { IngredientsService } from '../../services/ingredients-service';
import { CategoriaIngredienteService } from '../../services/categoria-ingrediente-service';
import { TagprodottoService } from '../../services/tagprodotto-service';
import { FormsModule } from '@angular/forms';
import { ingrediente } from '../../models/ingrediente.model';

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

  ingredientSelection = computed<Map<string, SelectableIngredient[]>>(() => {
    const map = new Map<string, SelectableIngredient[]>();

    for (const ing of this.ingredienteSignal()) {
      const list = map.get(ing.categoriaIngrediente.nome) ?? [];
      list.push({selected: false, quantity: 1, ingrediente: ing});
      map.set(ing.categoriaIngrediente.nome, list);
    }
    return map;
  })

  promozioneSignalPlaceholder: { id: number; sconto: number; isActive: boolean}[] = [
    {id: 1, sconto: 10, isActive: true},
    {id: 2, sconto: 40, isActive: false}
  ]

  ngOnInit(): void {
    this.productService.list();
    this.ingredienteService.list();
    this.categoriaIngredienteService.list();
    this.tagProdottoService.list();
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
}
