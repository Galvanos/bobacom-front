import { inject, Service } from '@angular/core';
import { LoginDTO, LoginReq, UtenteDTO } from '../models/dto';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, switchMap, catchError, throwError, finalize, shareReplay, map, of } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import { AppSettings } from '../setting/config-model';
import { APP_SETTING } from '../setting/token';

@Service()
export class AuthNetworkService {

    private readonly settings: AppSettings = inject(APP_SETTING);
    private readonly http = inject(HttpClient);
    private readonly authService = inject(AuthService);

    getBaseUrl(): string {
        return this.settings.apiUrl + 'auth/';
    }
    login(body: LoginReq): Observable<UtenteDTO> {
        return this.http.post<LoginDTO>(this.getBaseUrl() + "login", body, { withCredentials: true })
            .pipe(
                tap(resp => {
                    this.authService.setToken(resp.accessToken);
                }),
                switchMap(() => this.me()),
            );
    }
    me(): Observable<UtenteDTO> {
        return this.http.get<UtenteDTO>(this.getBaseUrl() + "me").pipe(
            tap(user => this.authService.setAuthenticated(user))
        );
    }
    logout(){
        return this.http.post(this.getBaseUrl() + 'logout', {}, { withCredentials: true })
    }
    /*
    * Contiene la richiesta di refresh in corso.
    *
    * Serve a evitare che n richieste HTTP fallite contemporaneamente
    * provochino n chiamate differenti a /refresh.
    */
    private refreshRequest$: Observable<LoginDTO> | null = null;


    refreshToken(): Observable<LoginDTO> {

        if (this.refreshRequest$) {  // in caso di refresh già in corso restituisco quello in corso
            return this.refreshRequest$;
        }

        this.refreshRequest$ = this.http.post<LoginDTO>(this.getBaseUrl() + "refresh", {}, { withCredentials: true })
            .pipe(
                tap(resp => { this.authService.setToken(resp.accessToken) }),
                catchError(error => {  // in case of error
                    this.authService.resetAll();
                    return throwError(() => error);
                }),
                finalize(() => { // end of process
                    this.refreshRequest$ = null;
                }),
                shareReplay({ // share response with all request running at same time
                    bufferSize: 1,
                    refCount: false
                })
            )

        return this.refreshRequest$;
    }

    restoreSession(): Observable<boolean> {

        return this.refreshToken().pipe(
            switchMap(() =>
                this.me()
            ),
            tap(user => {
                this.authService.setAuthenticated(user);
            }),
            map(() => true),
            catchError(() => {
                this.authService.resetAll();
                return of(false);
            })
        );
    }


}
