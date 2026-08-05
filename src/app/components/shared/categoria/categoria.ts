import { Component } from '@angular/core';

@Component({
  selector: 'app-categorie',
  imports: [],
  templateUrl: './categoria.html',
  styleUrl: './categoria.css',
})
export class Categorie {
  categorie = [
  { name: 'Milk Bubble Tea', image: '/img/milk.png' },
  { name: 'Fruit Bubble Tea', image: '/img/pina.png' },
  { name: 'Caffè', image: '/img/coffee.png' },
];
}