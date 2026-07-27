import { Component, output } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';


@Component({
  selector:'app-product-filter',
  standalone:true,
  imports:[
    MatTabsModule
  ],
  templateUrl:'./product-filter.html',
  styleUrl: './product-filter.css'

})
export class ProductFilterComponent {


  categoryChange = output<string>();


  changeTab(event:any){

    const categories=[
      'milk',
      'fruit',
      'coffee'
    ];

    this.categoryChange.emit(
      categories[event.index]
    );

  }

}