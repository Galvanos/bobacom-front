import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante per usare *ngFor

@Component({
  selector: 'app-root', // Questo nome deve essere identico al tag in index.html
  standalone: true,
  imports: [CommonModule], // Necessario per le direttive come *ngFor
  templateUrl: './app.html'
})
export class AppComponent {
  prodotti = [
    { nome: 'Taro Milk Tea', prezzo: 4.50 },
    { nome: 'Mango Green Tea', prezzo: 5.00 }
  ];
}