import { Component, Output, EventEmitter } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [
    MatTabsModule
  ],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css'
})
export class ProductFilterComponent {


  @Output() categoryChange = new EventEmitter<string>();


  changeTab(event: any) {

    let category = 'milk';


    switch(event.index){

      case 0:
        category = 'milk';
        break;

      case 1:
        category = 'fruit';
        break;

      case 2:
        category = 'coffee';
        break;

    }


    this.categoryChange.emit(category);

  }

}