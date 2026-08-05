import { Component, inject, OnInit } from '@angular/core';
import { TagprodottoService } from '../../services/tagprodotto-service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tag-management',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './tag-management.html',
  styleUrl: './tag-management.css',
})
export class TagManagement implements OnInit{
  ngOnInit(): void {
    this.tagProdottoService.list();
  }
  private tagProdottoService = inject(TagprodottoService);
  tagSignal = this.tagProdottoService.tagProdotto;

  newTag = {
    id: 0,
    nome: '',
    descrizione: ''
  }

  onSubmit(): void{
    this.tagProdottoService.create(this.newTag).subscribe({
      next: () => {
        this.newTag = {
          id: 0,
          nome: '',
          descrizione: ''
        }
      }}
    );
  }
}