import { HttpClient } from '@angular/common/http';
import { inject, Service, signal } from '@angular/core';
import { tap } from 'rxjs';
import { tag } from '../models/tag.model';

@Service()
export class TagprodottoService {

    tagProdotto = signal<tag[]>([]);
    url = "http://localhost:8080/rest/tag_prodotto/";
    private http = inject(HttpClient);

    list(){
        this.http.get(this.url + "list")
            .subscribe({
                next: ((r: any) => this.tagProdotto.set(r))
            })
    }

    listOrdered(){
        this.http.get(this.url + "listOrdered")
            .subscribe({
                next: ((r: any) => this.tagProdotto.set(r))
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
