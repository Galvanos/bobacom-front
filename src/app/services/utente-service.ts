import { inject, Service } from '@angular/core';
import { UtenteDTO, UtenteReq } from '../models/dto';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';

@Service()
export class UtenteService {

    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'utente/';
    }

    create(utente: UtenteReq) {
        return this.http.post(this.getBaseUrl() + 'public/create', utente);
        //al momento non ci sono pagine amministrative ma se ci saranno alla creazione va invocata la list

    }

    findByUsername(username?: string | null) {
        if (username) {
            const params = new HttpParams().set("username", username);
            return this.http.get(this.getBaseUrl() + "user/getByUsername", { params });
            //al momento non ci sono pagine amministrative ma se ci saranno alla creazione va invocata la list
        } else {
            //si basa sull'utente loggato che viene identificato dal jwt in backend
            return this.http.get(this.getBaseUrl() + "user/getByUsername");
            //al momento non ci sono pagine amministrative ma se ci saranno alla creazione va invocata la list
        }

    }

    update(utente: UtenteReq){
        return this.http.patch(this.getBaseUrl() + 'user/update', utente);
    }
}
