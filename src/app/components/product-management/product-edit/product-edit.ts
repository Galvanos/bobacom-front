import { Component, computed, Inject, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProdottoService } from '../../../services/prodotto-service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { tag } from '../../../models/tag.model';
import { promozione } from '../../../models/promozione.model';
import { categoriaIngrediente } from '../../../models/categoria-ingrediente.model';
import { allergene } from '../../../models/allergene.model';
import { IngredientsService } from '../../../services/ingredients-service';

interface ingrediente {
  id: number,
  nome: string,
  descrizione: string,
  quantitaStock: number,
  sovraprezzoAggiunta: number,
  prezzoRestock: number,
  colore: string,
  allergeni: allergene[],
  categoriaIngrediente: categoriaIngrediente
}
interface SelectableIngredient {
  selected: boolean,
  quantity: number,
  ingrediente: any
}
interface composizione {
  id?: number,
  idProdotto: number,
  ingrediente: ingrediente,
  quantita: number
}
interface composizioneReq {
  idProdotto: number,
  idIngrediente: number,
  quantita: number
}
interface prodotto {
  id: number,
  nome: string,
  descrizione: string,
  imgUrl: string,
  tag: tag[],
  promozione: promozione[],
  composizione: composizione[]
}

@Component({
  selector: 'app-product-edit',
  imports: [FormsModule, MatDialogModule],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css',
})
export class ProductEdit {
  productService = inject(ProdottoService);
  ingredientiService = inject(IngredientsService);
  private dialogRef = inject(MatDialogRef<ProductEdit>);

  ingredientiSignal = this.ingredientiService.ingredients;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { prodotto: prodotto,
                                            ingredienti: ingrediente[],
                                            categorie: categoriaIngrediente[],
                                            tag: tag[],
                                            promo: promozione[]
                                          }
  ) {
    this.ingredientiService.list();

    this.newProduct.id = data.prodotto.id;
    this.newProduct.nome = data.prodotto.nome;
    this.newProduct.descrizione = data.prodotto.descrizione;
    this.newProduct.imgUrl = data.prodotto.imgUrl;
    for(const tag of data.prodotto.tag)
      this.newProduct.tag.push(tag.id.toFixed(0));
    for(const promo of data.prodotto.promozione)
      this.newProduct.promozione.push(promo.id.toFixed(0));
  }

  newProduct = {
    id: 0,
    nome: '',
    descrizione: '',
    imgUrl: '',
    tag: [] as string[],
    promozione: [] as string[],
    composizione: [] as composizioneReq[]
  }

    ingredientSelection = computed<Map<string, SelectableIngredient[]>>(() => {
    const map = new Map<string, SelectableIngredient[]>();

    for (const ing of this.ingredientiSignal()) {
      const list = map.get(ing.categoriaIngrediente.nome) ?? [];
      const foundComp = this.data.prodotto.composizione.find(comp => comp.ingrediente.id == ing.id);
      if(foundComp)
        list.push({selected: true, quantity: foundComp.quantita, ingrediente: ing});
      else
        list.push({selected: false, quantity: 1, ingrediente: ing});
      map.set(ing.categoriaIngrediente.nome, list);
    }
    return map;
  })

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

  close(): void {
    this.dialogRef.close();
  }

  editWithSuccess = signal(false);

  onSubmit(): void {
    const composArray = [] as composizioneReq[];
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

    this.productService.update(this.newProduct).subscribe({
      next: () => {}});
    this.editWithSuccess.set(true);
  }
}
