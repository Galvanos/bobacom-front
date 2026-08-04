import { inject, Service } from '@angular/core';
import { AppSettings } from '../setting/config-model';
import { HttpClient } from '@angular/common/http';
import { APP_SETTING } from '../setting/token';
import { AddCreditReq, DecreaseCreditReq, UtenteDTO } from '../models/dto';
import { Observable } from 'rxjs';
import { CreditoService } from './credito-service';

@Service()
export class CreditoNetworkService {

    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);
    private creditoService: CreditoService = inject(CreditoService);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'credito/';
    }

    addCredito(body: AddCreditReq): Observable<UtenteDTO> {
        return this.http.patch<UtenteDTO>(this.getBaseUrl() + "user/addCredito", body, { withCredentials: true });
    }

    decreaseCredito(body :DecreaseCreditReq): Observable<UtenteDTO> {
        console.log('entered this.decreaseCredito', body);
        return this.http.patch<UtenteDTO>(this.getBaseUrl() + "user/decreaseCredito", body, { withCredentials: true });
    }

}
