export interface AppSettings {
  apiUrl: string;
  pageSize: number;
  /**
   * secret per la chiamata a credito, 
   * deve corrispondere a app.credito.secret di application.properties del backend
   */
  creditoSecret: string;
}