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
  email:string | null,
  password:string | null,
  ruolo:string | null,
  credito:number | null,
  indirizzo:string | null,
  ordini:any[] | null
}