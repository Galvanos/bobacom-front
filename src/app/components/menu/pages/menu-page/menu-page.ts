import { Component, signal } from '@angular/core';

import { ProductCardComponent } from '../../components/product-card/product-card';
import { ProductFilterComponent } from '../../components/product-filter/product-filter';
import { composizione } from '../../../../models/composizione.model';

interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  composizione: composizione[];
}

@Component({
  selector: 'app-menu-page',

  standalone: true,

  imports: [ProductCardComponent, ProductFilterComponent],

  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css',
})
export class MenuPage {
  selectedCategory = 'milk';

  products = signal<Product[]>([
    {
      id: 1,
      name: 'Classic Black Milk Tea',
      description: 'Tè nero con latte cremoso e perle di tapioca.',
      imageUrl: 'img/milk-tea.png',
      category: 'milk',
      tags: ['tradizionale', 'cremoso'],
      composizione: [{idIngrediente:1, idProdotto:1, quantita:3}]
    },

    // /* <!--
    // {
    // id:2,
    // name:'Taro Milk Tea',
    // description:'Milk tea al taro dal gusto dolce e vanigliato.',
    // imageUrl:'img/milk-tea.png',
    // category:'milk',
    // tags:['dolce','vaniglia']
    // },

    // {
    // id:3,
    // name:'Brown Sugar Boba',
    // description:'Perle di tapioca con zucchero di canna.',
    // imageUrl:'img/milk-tea.png',
    // category:'milk',
    // tags:['caramello','speciale']
    // },

    // {
    // id:4,
    // name:'Matcha Green Milk Tea',
    // description:'Matcha giapponese con latte.',
    // imageUrl:'img/milk-tea.png',
    // category:'milk',
    // tags:['matcha','verde']
    // },

    // {
    // id:5,
    // name:'Mango Green Tea',
    // description:'Tè verde fresco al mango.',
    // imageUrl:'img/milk-tea.png',
    // category:'fruit',
    // tags:['mango','fresco']
    // },

    // {
    // id:6,
    // name:'Strawberry Tea',
    // description:'Tè alla fragola con frutta fresca.',
    // imageUrl:'img/milk-tea.png',
    // category:'fruit',
    // tags:['fragola','dolce']
    // },

    // {
    // id:7,
    // name:'Passion Fruit Tea',
    // description:'Tè tropicale al frutto della passione.',
    // imageUrl:'img/milk-tea.png',
    // category:'fruit',
    // tags:['tropicale','fresco']
    // },

    // {
    // id:8,
    // name:'Peach Oolong Tea',
    // description:'Tè oolong alla pesca.',
    // imageUrl:'img/milk-tea.png',
    // category:'fruit',
    // tags:['pesca','floreale']
    // },

    // {
    // id:9,
    // name:'Iced Coffee Boba',
    // description:'Caffè freddo con latte e tapioca.',
    // imageUrl:'img/milk-tea.png',
    // category:'coffee',
    // tags:['caffè','energia']
    // },

    // {
    // id:10,
    // name:'Vanilla Coffee',
    // description:'Caffè con aroma vaniglia.',
    // imageUrl:'img/milk-tea.png',
    // category:'coffee',
    // tags:['vaniglia','cremoso']
    // },

    // {
    // id:11,
    // name:'Caramel Coffee',
    // description:'Caffè freddo al caramello.',
    // imageUrl:'img/milk-tea.png',
    // category:'coffee',
    // tags:['caramello','dolce']
    // },

    // {
    // id:12,
    // name:'Mocha Boba',
    // description:'Caffè e cioccolato con tapioca.',
    // imageUrl:'img/milk-tea.png',
    // category:'coffee',
    // tags:['cioccolato','speciale']
    // }

    // --> */
  ]);

  changeCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredProducts() {
    return this.products().filter((product) => product.category === this.selectedCategory);
  }
}
