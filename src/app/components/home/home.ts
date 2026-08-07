// home.component.ts
import { Component } from '@angular/core';
import { Hero } from '../shared/hero/hero';
import { Categorie } from '../shared/categoria/categoria';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [  Hero, Categorie ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {}