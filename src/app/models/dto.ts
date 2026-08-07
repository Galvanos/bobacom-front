export interface LoginReq {
  username: string;
  password: string;
}
export interface LoginDTO{
  accessToken:string,
  tokenType:string
}
export interface UtenteDTO{
  id:number,
  username:string,
  email:string | null | undefined,
  password:string | null | undefined,
  ruolo:string | null | undefined,
  credito:number | null | undefined,
  indirizzo:string | null | undefined,
  ordini:any[] | null | undefined
}
export interface UtenteReq{
  id:number | null | undefined,
  username:string,
  email:string | null | undefined,
  password:string | null | undefined,
  ruolo:string | null | undefined,
  credito:number | null | undefined,
  indirizzo:string | null | undefined
}

/**
 * Risposta del web service di aggiunta credito con pagamento stripe
 */
export interface StripedUtenteDTO extends UtenteDTO{
   clientSecret:string | null | undefined
}

export interface AddCreditReq {

	/**
	 * Id dell'utente a cui aumentare il credito, se un utente è loggato si assume che conosca il suo id,
	 * se è  un admin si assume che sappia l'id dell'utente da aggiornare, non serve password perché sono sempre loggati,
   * se omesso recupera i dati dell'utente loggato
	 */
	userId:number | null | undefined,
	/**
	 * Valore del credito da aggiungere
   */
	credit:number
}

export interface DecreaseCreditReq {

	/**
	 * Id dell'utente a cui diminuire il credito,
	 * nelle chiamate da parte dell'utente può essere omesso 
	 */
	 userId:number | null | undefined;
	
	/**
	 * Valore del credito da diminuire
	 */
	credit:number;

}