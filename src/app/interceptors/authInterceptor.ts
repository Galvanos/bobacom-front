import { HttpErrorResponse, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "../auth/auth-service";
import { catchError, switchMap, throwError } from "rxjs";
import { AuthNetworkService } from "../security/auth-network-service";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const authNetworkService = inject(AuthNetworkService);
    const authService = inject(AuthService);
    const token = authService.grant().token;

    const publicUrls = [
        '/rest/auth/login',
        '/rest/auth/refresh',
        '/public/'
    ];

    const isPublic = publicUrls.some(url => req.url.includes(url))
    let requestToSend = req.clone({
        withCredentials: true
    });

    if (token && !isPublic) { 
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
            if (error.status !== 401 || isPublic) { 
                return throwError(() => error); 
            } 
            console.log('prova de refresh.....')
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
                    authService.resetAll(); 
                    return throwError(() => refreshError);
                 }
                ));
             }));
};