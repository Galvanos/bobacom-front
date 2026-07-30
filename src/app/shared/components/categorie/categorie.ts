import { Component } from '@angular/core';

@Component({
  selector: 'app-categorie',
  imports: [],
  templateUrl: './categorie.html',
  styleUrl: './categorie.css',
})
export class Categorie {
  categorie = [
  { name: 'Classic Milk Tea', image: 'assets/categories/classic.jpg' },
  { name: 'Fruit Tea', image: 'assets/categories/fruit.jpg' },
  { name: 'Cheese Foam', image: 'assets/categories/cheese.jpg' },
  { name: 'Special', image: 'assets/categories/special.jpg' }
];
}
// categories.component.ts

