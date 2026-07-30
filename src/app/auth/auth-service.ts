import { Service, signal } from '@angular/core';
import { UtenteDTO } from '../models/dto';

/**
 * Service per conservare i grant dell'authenticazione
 */
@Service()
export class AuthService {

    /**
     * Grant dell'autenticazione, contiene token JWT e i vari dati utente,
     * i valori di default sono quelli  di norma con nessun utente 
     * (anche se tramite cookies sarà possibile recuperare l'utente collegato e valorizzare questo grant)
     */
     grant = signal({
        /**
         * Token di autenticazione JWT
         */
        token: null as string | null,
        /**
         * dice se l'utente collegato è amministratore
         */
        isAdmin: false,
        /**
         * dice se c'é un utente collegato
         */
        isLogged: false,
        /**
         * username dell'utente collegato
         */
        username: null as string | null,
        /**
         * id numerico dell'utente collegato
         */
        userId: null as number | null
    });

    /**
     * Imposta il token JWT nel {@link grant}
     * @param token il token JWT da impostare
     */
    setToken(token: string) {
        this.grant.update(grant => ({
            ...grant,     // copia tutte le proprieta di grant
            token: token
        }));
    }

    /**
     * Imposta i dati utente nel {@link grant}
     * @param user i dati utente ottenibili con il web service me
     */
    setAuthenticated(user: UtenteDTO) {
        let admin = user.ruolo === 'ADMIN' ? true : false;

        this.grant.update(grant => ({
            ...grant,     // copia tutte le proprieta di grant
            isLogged: true,
            isAdmin: admin,
            username: user.username,
            userId: user.id
        }));
    }

    /**
     * Reimposta il grant ai valori di default associati a non avere utenti autenticati
     * @see {@link grant}
     */
    resetAll() {
        this.grant.set({
            token: null,
            isAdmin: false,
            isLogged: false,
            username: null,
            userId: null
        });
    }

    /**
     * Dice se c'é un utente autenticato collegato
     * @returns true se c'é un utente collegato, false altrimenti
     */
     isAuthenticated(): boolean {
        return this.grant().isLogged;
    }

    /**
     * Dice se è collegato un utente amministratore, 
     * per costruzione implica che sia collegato un utente,
     * vedi i valori di default e i metodi che valorizzano il campo {@link grant().isAdmin}
     * @returns true se è collegato un  ed è amministratore, false altrimenti 
     * @see {@link setAuthenticated}
     * @see {@link grant}
     * @see {@link resetAll}
     */
    isRoleAdmin() {
        return this.grant().isAdmin;
    }

    /**
     * Dice se è collegato un utente non amministratore, 
     * vedi i valori di default e i metodi che valorizzano il campo {@link grant().isAdmin}
     * @returns true se è collegato un utente ma NON è amministratore, false altrimenti
     * @see {@link setAuthenticated}
     * @see {@link grant}
     * @see {@link resetAll}
     */
    isRoleUser(){
        if(!this.isRoleAdmin()){
            return this.isAuthenticated();
        }
        return false;
    }
}
