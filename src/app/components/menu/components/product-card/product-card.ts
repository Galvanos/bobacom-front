import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    MatGridListModule,
    MatTabsModule,
    ProductCardComponent
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {
  product = input.required<any>();

}