import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { CustomizationComponent } from '../customization/customization';


@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule
  ],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCardComponent {


  // prodotto ricevuto da menu-page
  product = input.required<any>();


  // quantità selezionata nella card
  selectedQuantity = 1;



  constructor(
    private dialog: MatDialog
  ) {}



  decreaseQuantity() {

    if (this.selectedQuantity > 1) {
      this.selectedQuantity--;
    }

  }



  increaseQuantity() {

    this.selectedQuantity++;

  }



  addToCart() {

    console.log(
      'Prodotto aggiunto:',
      this.product().name,
      'Quantità:',
      this.selectedQuantity
    );

  }



  customizeProduct() {

    this.dialog.open(CustomizationComponent, {

      width: '700px',

      data: {

        product: this.product(),

        quantity: this.selectedQuantity

      }

    });

  }


}