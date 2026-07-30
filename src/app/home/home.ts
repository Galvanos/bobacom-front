// home.component.ts
import { Component } from '@angular/core';
import { Navbar } from '../shared/components/navbar/navbar';
import { Hero } from '../shared/components/hero/hero';
import { Categorie } from '../shared/components/categorie/categorie';
import { ProdottiCard } from '../shared/components/prodotti-card/prodotti-card';
import { Footer } from '../shared/components/footer/footer';
import { Header } from '../shared/components/header/header';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ Header, Navbar, Hero, Categorie, ProdottiCard, Footer ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class Home {}