import { Service, signal } from '@angular/core';

@Service()
export class CreditoService {

    credito = signal<number>(0);

    setCredito(creditoToSet:number){
        this.credito.set(creditoToSet);
    }

    addCredito(toAdd:number){
        let creditoCaculated = this.credito();
        creditoCaculated += toAdd;
        this.credito.set(creditoCaculated);
    }
    

}
