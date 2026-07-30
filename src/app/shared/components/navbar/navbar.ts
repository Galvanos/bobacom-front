// navbar.component.ts
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.html', // o navbar.html, in base al tuo schematic
  styleUrl: './navbar.css'
})
export class NavbarComponent {
  cartCount = 0; // per ora statico, poi lo collegherai a un CartService
}