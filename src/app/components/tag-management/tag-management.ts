import { Component, inject, OnInit } from '@angular/core';
import { TagprodottoService } from '../../services/tagprodotto-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tag-management',
  imports: [FormsModule],
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