import { Component, computed, effect, inject, linkedSignal, OnInit, signal } from '@angular/core';

import { ProductCardComponent } from '../../components/product-card/product-card';
import { ProductFilterComponent } from '../../components/product-filter/product-filter';
import { composizione } from '../../../../models/composizione.model';
import { ProdottoService } from '../../../../services/prodotto-service';
import { TagprodottoService } from '../../../../services/tagprodotto-service';
import { tag } from '../../../../models/tag.model';
import { IngredientsService } from '../../../../services/ingredients-service';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  tags: string[];
  composizione: composizione[]; // Torna obbligatoria per combaciare con ProductCardComponent
}

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css',
})
export class MenuPage implements OnInit{
  productService = inject(ProdottoService);
  tagService = inject(TagprodottoService);

  productSignal = this.productService.prodotto;
  tagSignal = this.tagService.tagProdotto;

  selectedTag = linkedSignal(() => this.tagSignal()[0]?.nome ?? '');

  ngOnInit(): void {
    this.tagService.listOrdered();
    this.productService.list();
  }

  constructor(){
    effect(() => {
      this.selectedTag.set(this.tagSignal()[0] ? this.tagSignal()[0].nome : '');
    })
  }

  changeTag(tag: string) {
    this.selectedTag.set(tag);
  }

  filteredProducts = computed(() => {
    const tags = this.tagSignal();
    const products = this.productSignal();
    let currentTag = tags.find((tag) => tag.nome == this.selectedTag());
    if (!currentTag) return [];
    return products.filter((product) => product.tag.some((tag: tag) => tag.id == currentTag.id));
  });
}