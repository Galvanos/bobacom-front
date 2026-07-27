import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../auth/auth-service";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthNetworkService } from "../security/auth-network-service";
import { APP_SETTING } from "../setting/token";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authNetworkService = inject(AuthNetworkService);
    const appSettings = inject(APP_SETTING);
    const authService = inject(AuthService);
    const token = authService.grant().token;
    const apiUrl = appSettings.apiUrl;

    const publicUrls = [
        '/rest/auth/login',
        '/rest/auth/refresh',
        '/public/'
    ];

    const isApi = req.url.startsWith(apiUrl);
    const isPublic = publicUrls.some(url => req.url.includes(url));

    const isPublicApi = isPublic && isApi;
    console.log('[authInterceptor] request', req.method, req.url, { isApi, isPublicApi, token: !!token });

    let requestToSend = req.clone();

    if(isApi){
        requestToSend = req.clone({
        withCredentials: true
    });
    }

    if (token && !isPublicApi && isApi) { 
        requestToSend = requestToSend.clone({ 
            setHeaders: 
            { 
                Authorization: 'Bearer ' + token 
            } 
        });
    }
    return next(requestToSend).pipe(
        catchError((error: HttpErrorResponse) => { 
            /* * Il refresh viene eseguito solo quando: 
            * - la risposta è 401; * - la richiesta non è pubblica; 
            * - la richiesta non è già /auth/refresh. */ 
            if (error.status !== 401 || isPublicApi || !isApi) { 
                return throwError(() => error); 
            } 
            console.log('[authInterceptor] 401 received for', req.method, req.url);
            return authNetworkService.refreshToken().pipe(
                switchMap(response => { 
                    authService.setToken(response.accessToken); // save new token 
                   const repeatedRequest = req.clone({     // resend ol request with new token
                    withCredentials: true, 
                    setHeaders: { 
                        Authorization: 'Bearer ' + response.accessToken 
                    } }); 
                    return next(repeatedRequest); 
                }), 
                catchError(refreshError => { 
                    console.log('[authInterceptor] refresh failed for', req.method, req.url, refreshError);
                    authService.resetAll(); 
                    return throwError(() => refreshError);
                 }
                ));
             }));
};