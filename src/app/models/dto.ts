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
  ruolo:string | null,
  password:string | null,
  credito:number | null,
  indirizzo:string | null,
  ordini:any[] | null
}