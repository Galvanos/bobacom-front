import { Component, Output, EventEmitter, inject, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { TagprodottoService } from '../../../../services/tagprodotto-service';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './product-filter.html',
  styleUrl: './product-filter.css',
})
export class ProductFilterComponent implements OnInit{

  tagService = inject(TagprodottoService);

  tagSignal = this.tagService.tagProdotto;

  ngOnInit(): void {
    this.tagService.listOrdered();
  }

  @Output() categoryChange = new EventEmitter<string>();

  changeTab(event: any) {
    this.categoryChange.emit(event.tab.textLabel);
  }
}
