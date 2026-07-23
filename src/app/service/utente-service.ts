import { inject, Service } from '@angular/core';
import { UtenteDTO } from '../models/dto';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';

@Service()
export class UtenteService {

    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'utente/';
    }

    create(utente:UtenteDTO){

        return this.http.post(this.getBaseUrl()+'/public/create',utente);
        //al momento non ci sono pagine amministrative ma se ci saranno alla creazione va invocata la list

    }

     findByUsername(username?: string) {
        //TODO ripendere qui
        //const params = new HttpParams().set("userName", id);
        //return this.http.get(this.getBaseUrl() + "user/getById", { params });
        return this.http.get(this.getBaseUrl() + "user/getById");
    }
}
