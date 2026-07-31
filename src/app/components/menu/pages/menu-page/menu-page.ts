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
  composizione: composizione[]; // Torna obbligatoria per combaciare con ProductCardComponent
}

@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [ProductCardComponent, ProductFilterComponent],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css',
})
export class MenuPage {
  selectedCategory = 'loved';

  products = signal<Product[]>([
    {
      id: 0,
      name: 'Crea il tuo bubble tea',
      description: '',
      imageUrl: 'img/vuoto.png',
      category: 'loved',
      tags: [],
      composizione: []
    },
    {
      id: 1,
      name: 'Classic Black Milk Tea',
      description: 'Tè nero con latte cremoso e perle di tapioca.',
      imageUrl: 'img/milk.png',
      category: 'milk',
      tags: ['tradizionale', 'cremoso'],
      composizione: [{ idIngrediente: 1, idProdotto: 1, quantita: 1 }]
    },
    {
      id: 2,
      name: 'Taro Milk Tea',
      description: 'Milk tea al taro dal gusto dolce e vanigliato.',
      imageUrl: 'img/milk-tea.png',
      category: 'taro-milk',
      tags: ['dolce', 'vaniglia'],
      composizione: [{ idIngrediente: 1, idProdotto: 1, quantita: 1 }]
    },
    {
      id: 3,
      name: 'Matcha Green Milk Tea',
      description: 'Matcha giapponese con latte.',
      imageUrl: 'img/matcha.png',
      category: 'milk',
      tags: ['matcha', 'verde'],
      composizione: []
    },
    {
      id: 4,
      name: 'Mixed fruit Tea',
      description: 'Tè verde fresco alla frutta mista',
      imageUrl: 'img/fruit.png',
      category: 'fruit',
      tags: ['mango', 'fresco'],
      composizione: []
    },
    {
      id: 5,
      name: 'Ananas fruit Tea',
      description: 'Tè tropicale all\'ananas.',
      imageUrl: 'img/pina.png',
      category: 'fruit',
      tags: ['tropicale', 'fresco'],
      composizione: []
    },
    {
      id: 6,
      name: 'Peach Oolong Tea',
      description: 'Tè oolong alla pesca.',
      imageUrl: 'img/pesca.png',
      category: 'fruit',
      tags: ['pesca', 'floreale'],
      composizione: []
    },
    {
      id: 7,
      name: 'Iced Coffee Boba',
      description: 'Caffè freddo con latte e tapioca.',
      imageUrl: 'img/iced-coffee.png',
      category: 'coffee',
      tags: ['caffè', 'energia'],
      composizione: []
    },
    {
      id: 8,
      name: 'Caramel Coffee',
      description: 'Caffè freddo al caramello e panna montata.',
      imageUrl: 'img/caramel-latte.png',
      category: 'coffee',
      tags: ['caramello', 'dolce'],
      composizione: []
    },
    {
      id: 9,
      name: 'Mocha Boba',
      description: 'Caffè e cioccolato con tapioca e panna montata.',
      imageUrl: 'img/coffee.png',
      category: 'coffee',
      tags: ['cioccolato', 'speciale'],
      composizione: []
    }
  ]);

  changeCategory(category: string) {
    this.selectedCategory = category;
  }

  get filteredProducts() {
    return this.products().filter((product) => product.category === this.selectedCategory);
  }
}