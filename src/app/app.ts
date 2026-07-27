import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root', 
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink], 
  templateUrl: './app.html'
})
export class AppComponent {
  prodotti = [
    { nome: 'Taro Milk Tea', prezzo: 4.50 },
    { nome: 'Mango Green Tea', prezzo: 5.00 }
  ];
}
