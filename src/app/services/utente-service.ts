import { inject, Service, signal } from '@angular/core';
import { UtenteDTO, UtenteReq } from '../models/dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';
import { tap } from 'rxjs';

@Service()
export class UtenteService {

    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);

    utenti = signal<UtenteDTO[]>([]);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'utente/';
    }

    create(utente: UtenteReq) {
        return this.http.post(this.getBaseUrl() + 'public/create', utente);
        //non richiamo list dopo il create perché list è amministrativo, va richiamato solo se a modificare è un amministratore
    }

    findByUsername(username?: string | null) {
        if (username) {
            const params = new HttpParams().set("username", username);
            return this.http.get(this.getBaseUrl() + "user/getByUsername", { params });
        } else {
            //si basa sull'utente loggato che viene identificato dal jwt in backend
            return this.http.get(this.getBaseUrl() + "user/getByUsername");
        }

    }

    update(utente: UtenteReq){
        return this.http.patch(this.getBaseUrl() + 'user/update', utente);
        //non richiamo list dopo il update perché list è amministrativo, va richiamato solo se a modificare è un amministratore
    }

    updateAdmin(utente: UtenteReq){
        return this.http.patch(this.getBaseUrl() + 'admin/update', utente).pipe(
            tap(resp => {
                this.list();
            })
        );
        //non richiamo list dopo il update perché list è amministrativo, va richiamato solo se a modificare è un amministratore
    }

    list(){ 
         return this.http.get<UtenteDTO[]>(this.getBaseUrl() + "admin/list").subscribe({
           next: ((users: UtenteDTO[]) => {
             this.utenti.set(users);
           }),
           error:((err) =>{
            console.log('errore list utenti',err);
           })
         })
    }
}
