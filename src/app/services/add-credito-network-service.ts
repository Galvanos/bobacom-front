import { inject, Service } from '@angular/core';
import { AppSettings } from '../setting/config-model';
import { HttpClient } from '@angular/common/http';
import { APP_SETTING } from '../setting/token';

@Service()
export class AddCreditoNetworkService {

    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'credito/';
    }

    login(body: LoginReq): Observable<UtenteDTO> {
            console.log('[AuthNetworkService] login request', body.username);
            return this.http.post<LoginDTO>(this.getBaseUrl() + "login", body, { withCredentials: true })
                .pipe(
                    tap(resp => {
                        this.authService.setToken(resp.accessToken);
                        console.log('access token '+resp.accessToken);
                    }),
                    switchMap(() => this.me()),
                );
        }


}
