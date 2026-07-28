import { Component, inject, OnInit } from '@angular/core';
import { UtenteService } from '../../services/utente-service';

@Component({
  selector: 'app-list-utenti',
  imports: [],
  templateUrl: './list-utenti.html',
  styleUrl: './list-utenti.css',
})
export class ListUtenti implements OnInit{
  

  utenteService = inject(UtenteService);

  get utenti(){
    return this.utenteService.utenti();
  }

  ngOnInit(): void {
    this.utenteService.list();
  }
}
