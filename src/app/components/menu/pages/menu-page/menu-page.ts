import { Component, signal } from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card';
import { ProductFilterComponent } from '../../components/product-filter/product-filter';


interface Product {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
}


@Component({
  selector: 'app-menu-page',
  standalone: true,
  imports: [
    ProductCardComponent,
    ProductFilterComponent
  ],
  templateUrl: './menu-page.html',
  styleUrl: './menu-page.css'
})
export class MenuPage {


  selectedCategory = 'milk';


  products = signal<Product[]>([

    // 🧋 MILK BUBBLE TEA

    {
      id: 1,
      name: 'Classic Black Milk Tea',
      description: 'Tè nero robusto con latte cremoso e perle di tapioca.',
      imageUrl: 'img/milk-tea.png',
      category: 'milk',
      tags: [
        'tradizionale',
        'cremoso'
      ]
    },

    {
      id: 2,
      name: 'Taro Milk Tea',
      description: 'Milk tea al taro dal gusto dolce e vanigliato.',
      imageUrl: 'img/milk-tea.png',
      category: 'milk',
      tags: [
        'dolce',
        'vaniglia'
      ]
    },

    {
      id: 3,
      name: 'Brown Sugar Boba',
      description: 'Perle di tapioca con zucchero di canna e latte fresco.',
      imageUrl: 'img/milk-tea.png',
      category: 'milk',
      tags: [
        'caramello',
        'speciale'
      ]
    },

    {
      id: 4,
      name: 'Matcha Green Milk Tea',
      description: 'Matcha giapponese con latte cremoso.',
      imageUrl: 'img/milk-tea.png',
      category: 'milk',
      tags: [
        'matcha',
        'energizzante'
      ]
    },


    // 🍓 FRUIT TEA

    {
      id: 5,
      name: 'Mango Green Tea',
      description: 'Tè verde fresco con mango e ghiaccio.',
      imageUrl: 'img/milk-tea.png',
      category: 'fruit',
      tags: [
        'mango',
        'fresco'
      ]
    },

    {
      id: 6,
      name: 'Strawberry Tea',
      description: 'Tè alla fragola con frutta fresca.',
      imageUrl: 'img/milk-tea.png',
      category: 'fruit',
      tags: [
        'fragola',
        'dolce'
      ]
    },

    {
      id: 7,
      name: 'Passion Fruit Tea',
      description: 'Tè tropicale al frutto della passione.',
      imageUrl: 'img/milk-tea.png',
      category: 'fruit',
      tags: [
        'tropicale',
        'rinfrescante'
      ]
    },

    {
      id: 8,
      name: 'Peach Oolong Tea',
      description: 'Tè oolong alla pesca con aroma floreale.',
      imageUrl: 'img/milk-tea.png',
      category: 'fruit',
      tags: [
        'pesca',
        'floreale'
      ]
    },


    // ☕

    {
      id: 9,
      name: 'Iced Coffee Boba',
      description: 'Caffè freddo con latte e perle di tapioca.',
      imageUrl: 'img/milk-tea.png',
      category: 'coffee',
      tags: [
        'caffè',
        'energizzante'
      ]
    },

    {
      id: 10,
      name: 'Vanilla Coffee',
      description: 'Caffè con latte e aroma di vaniglia.',
      imageUrl: 'img/milk-tea.png',
      category: 'coffee',
      tags: [
        'vaniglia',
        'cremoso'
      ]
    },

    {
      id: 11,
      name: 'Caramel Coffee',
      description: 'Caffè freddo con caramello.',
      imageUrl: 'img/milk-tea.png',
      category: 'coffee',
      tags: [
        'caramello',
        'dolce'
      ]
    },

    {
      id: 12,
      name: 'Mocha Boba',
      description: 'Caffè e cioccolato con topping di tapioca.',
      imageUrl: 'img/milk-tea.png',
      category: 'coffee',
      tags: [
        'cioccolato',
        'speciale'
      ]
    }

  ]);



  changeCategory(category: string) {
    this.selectedCategory = category;
  }



  get filteredProducts(): Product[] {

    return this.products().filter(
      product => product.category === this.selectedCategory
    );

  }

}