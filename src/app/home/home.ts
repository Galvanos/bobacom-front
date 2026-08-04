// home.component.ts
import { Component } from '@angular/core';
import { Navbar } from '../shared/components/navbar/navbar';
import { Hero } from '../shared/components/hero/hero';
import { Categorie } from '../shared/components/categorie/categorie';
import { Footer } from '../shared/components/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ Navbar, Hero, Categorie, Footer ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}