import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';

@Service()
export class ProdottoService {

    prodotto = signal<any[]>([]);
    url = "http://localhost:8080/rest/prodotto/";
    private http = inject(HttpClient);

    
    list(){
        this.http.get(this.url + "list")
            .subscribe({
                next: ((r: any) => this.prodotto.set(r))
            })
    }

    create(body:{}){
        return this.http.post(this.url + "create", body)
            .pipe(tap(() => this.list()))  
    }

    update(body:{}){
        return this.http.patch(this.url + "update", body)
            .pipe(tap(() => this.list()))  
    }
    
    delete(id: string){
        this.http.delete(this.url + "delete/" + id )
            .pipe(tap(() => this.list()))  
    }
}
