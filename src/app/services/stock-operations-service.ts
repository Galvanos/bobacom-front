import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';

@Service()
export class StockOperationsService {

    
  stockOperations = signal<any[]>([]);
  url = "http://localhost:8080/rest/operazionemagazzino/";
  private http = inject(HttpClient);

  list(){
        this.http.get<any[]>(this.url + 'list')
        .subscribe({
          next: (resp) => {
              this.stockOperations.set(resp)
          }
      })
  }
    getById(id:number){
        let params = new HttpParams().set('id', id);
        return this.http.get(this.url + "getById", {params} );
    }

    create(body:{}){
        return this.http.post(this.url + "create", body)
            .pipe(tap(() => this.list()))  
    }
    update(body:{}){
        return this.http.patch(this.url + "update", body)
           .pipe(tap(() => this.list()))  
    }
}
