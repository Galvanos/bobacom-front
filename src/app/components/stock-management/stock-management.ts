import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { tap } from 'rxjs';
import { StockOperationsService } from '../../services/stock-operations-service';

@Component({
  selector: 'app-stock-management',
  imports: [],
  templateUrl: './stock-management.html',
  styleUrl: './stock-management.css',
})
export class StockManagement implements OnInit{

  private stockManagementS = inject(StockOperationsService);

  stockOperations = this.stockManagementS.stockOperations;

  selectedItem = signal<any | null>(null);

  ngOnInit(): void {
    this.loadList();
  }

  loadList(): void {
    this.stockManagementS.list();
  }

  createNewOperation(): void {
    const newOperation = { //robaccia hardcoded data da gemini
      description: 'New Stock Movement',
      quantity: 10,
      type: 'IN'
    };

    this.stockManagementS.create(newOperation).subscribe({
      next: (resp) => {
        console.log('Operation created successfully:', resp);
      },
      error: (err) => console.error('Error creating operation:', err)
    });
  }
  
  updateOperation(id: number): void {
    const updatedOperation = {  //robaccia hardcoded data da gemini
      id: id,
      description: 'Updated Stock Movement',
      quantity: 25
    };

    this.stockManagementS.update(updatedOperation).subscribe({
      next: (resp) => {
        console.log('Operation updated successfully:', resp);
      },
      error: (err) => console.error('Error updating operation:', err)
    });
  }


}

// <div class="container">
//   <h2>Stock Operations</h2>

//   <button (click)="createNewOperation()">+ Add New Stock Entry</button>
//   <button (click)="loadList()">Refresh List</button>

//   <hr />

//   <!-- Displaying the list from the service signal -->
//   <ul>
//     @for (item of stockOperations(); track item.id) {
//       <li>
//         <strong>#{{ item.id }}</strong> - {{ item.description }} (Qty: {{ item.quantity }})
        
//         <button (click)="fetchSingleItem(item.id)">View Details</button>
//         <button (click)="updateOperation(item.id)">Update</button>
//       </li>
//     } @empty {
//       <p>No stock operations found.</p>
//     }
//   </ul>

//   <!-- Selected Item Details -->
//   @if (selectedItem()) {
//     <div class="details-card">
//       <h3>Selected Item Details</h3>
//       <pre>{{ selectedItem() | json }}</pre>
//     </div>
//   }
// </div>