import { Injectable } from "@angular/core";
import { InMemoryDbService, RequestInfo } from "angular-in-memory-web-api";
import { Account } from "./account";
import { Hero } from "./hero";

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

    createDb() {
        const heroes = [
            { id: 12, name: 'Dr. Nice' },
            { id: 13, name: 'Bombasto' },
            { id: 14, name: 'Celeritas' },
            { id: 15, name: 'Magneta' },
            { id: 16, name: 'RubberMan' },
            { id: 17, name: 'Dynama' },
            { id: 18, name: 'Dr. IQ' },
            { id: 19, name: 'Magma' },
            { id: 20, name: 'Tornado' }
        ];
        const accounts = [
            { id: 1, login: 'admin', email: 'admin@admin', password: 'adminadmin', role: 'admin' },
            { id: 2, login: 'user', email: 'user@user', password: 'useruser', role: 'user' }
        ];
        return { heroes, accounts };
    }

    // genId(heroes: Hero[]): number {
    //     return (heroes.length > 0) ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
    // }
}