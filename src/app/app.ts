import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante per usare *ngFor
import { RouterOutlet, RouterLink  } from '@angular/router';

@Component({
  selector: 'app-root', 
  standalone: true,
  
  imports: [CommonModule, RouterOutlet, RouterLink], // Necessario per le direttive come *ngFor
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {

  protected readonly test = signal('test-signal');

  titolo = "Bobacom shop"
  oggi = new Date();

  prodotti = [
    { nome: 'Taro Milk Tea', prezzo: 4.50 },
    { nome: 'Mango Green Tea', prezzo: 5.00 }
  ];
}
