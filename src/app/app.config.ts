import { ApplicationConfig, inject, LOCALE_ID, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { APP_SETTING } from './setting/token';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { authInterceptor } from './interceptors/authInterceptor';
import { AuthNetworkService } from './security/auth-network-service';

import { registerLocaleData } from '@angular/common';    // localisation
import localeIt from '@angular/common/locales/it';       // localisation
registerLocaleData(localeIt);                            // localisation

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: APP_SETTING,
      useValue: {
        apiUrl: 'http://localhost:8080/rest/',
        pageSize: 4,
        creditoSecret: 'segreto'
      }
    },
    provideHttpClient(
      withInterceptors([authInterceptor])    // interceptor registration
    ),
    provideAppInitializer(() => { // service to execute in startup
      const refreshService = inject(AuthNetworkService);
      return firstValueFrom(refreshService.restoreSession()) // execute refresh in startup

    }),
    { provide: LOCALE_ID, useValue: 'it-IT' },
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes), provideClientHydration()
  ]
};
