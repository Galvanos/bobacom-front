import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';

@Service()
export class Promozione {

    promozione = signal<any[]>([]);
    url = "http://localhost:8080/rest/promozione/";
    private http = inject(HttpClient);

    
    list(idTag?: string, hasDiscount?: string){
        let params = new HttpParams();
        if(idTag) params = params.set('idTag', idTag);
        if(hasDiscount) params = params.set('hasDiscount', hasDiscount);

        this.http.get(this.url + "list", {params})
            .subscribe({
                next: ((r: any) => this.promozione.set(r))
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
