import { Component, inject, OnInit } from '@angular/core';
import { UtenteService } from '../../services/utente-service';
import { RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-list-utenti',
  imports: [RouterLink, MatButtonModule, MatIcon],
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
