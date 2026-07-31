import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';

@Service()
export class OrdineService {

    ordine = signal<any[]>([]);
    url = "http://localhost:8080/rest/ordine/";
    private http = inject(HttpClient);

    list(){
        this.http.get(this.url + "list")
            .subscribe({
                next: ((r: any) => this.ordine.set(r))
            })
    }
    
    listByUser(userId?: string){
        let params = new HttpParams();
        if(userId) params = params.set('id', userId);

        this.http.get(this.url + "list", {params})
            .subscribe({
                next: ((r: any) => this.ordine.set(r))
            })
    }

    create(body:{}){        
        console.log(body);
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
