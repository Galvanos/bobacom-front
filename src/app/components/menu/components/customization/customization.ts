import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-customization',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  templateUrl: './customization.html',
  styleUrl: './customization.css'
})
export class CustomizationComponent {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


}