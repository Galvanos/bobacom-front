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