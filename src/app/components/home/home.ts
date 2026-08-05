// home.component.ts
import { Component } from '@angular/core';
import { Navbar } from '../shared/navbar/navbar';
import { Hero } from '../shared/hero/hero';
import { Categorie } from '../shared/categoria/categoria';
import { Footer } from '../shared/footer/footer';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ Navbar, Hero, Categorie, Footer ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}