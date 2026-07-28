import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';

@Service()
export class StockOperationsService {
    
  stockOperations = signal<any[]>([]);
  url = "http://localhost:8080/rest/operazionemagazzino/";
  private http = inject(HttpClient);

    list(id?: string, idIngrediente?: string, dataMax?: string, dataMin?: string){
        let params = new HttpParams();
        if(id) params = params.set('id', id);
        if(idIngrediente) params = params.set('idIngrediente', idIngrediente);
        if(dataMax)  params = params.set('dataMax', dataMax);
        if(dataMin)  params = params.set('dataMin', dataMin);

        this.http.get(this.url + "list", {params})
            .subscribe({
                next: ((r: any) => this.stockOperations.set(r))
            })
    }

    create(body:{}){
        return this.http.post(this.url + "create", body)
            .pipe(tap(() => this.list()))  
    }

    delete(id: string){
        this.http.delete(this.url + "delete/" + id )
            .pipe(tap(() => this.list()))  
    }
}
