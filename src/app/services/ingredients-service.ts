import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ingrediente } from '../models/ingrediente.model';
@Service()
export class IngredientsService {

    ingredients = signal<any[]>([]);    
    url = "http://localhost:8080/rest/ingrediente/";    
    private http = inject(HttpClient);

    list(id?: string, idCategoria?: string, maxAmount?: string){
        let params = new HttpParams();
        if(id) params = params.set('id', id);
        if(idCategoria) params = params.set('idCategoria', idCategoria);
        if(maxAmount)  params = params.set('maxAmount', maxAmount);

        this.http.get(this.url + "list", {params})
            .subscribe({
                next: ((r: any) => this.ingredients.set(r))
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
        return this.http.delete(this.url + "delete/" + id )
            .pipe(tap(() => this.list()))
    }

}
