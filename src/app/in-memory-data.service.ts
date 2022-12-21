import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

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
            { id: 2, login: 'user', email: 'user@user', password: 'useruser', role: 'user' },
            { id: 3, login: 'dendi', email: 'dendi@dendi', password: 'dendidendi', role: 'user' },
            { id: 4, login: 'XBOCT', email: 'xboct@xboct', password: 'xboctxboct', role: 'user' },
            { id: 5, login: 'Lost', email: 'lost@lost', password: 'lostlost', role: 'user' },
            { id: 6, login: 'Funnik', email: 'funnik@funnik', password: 'funnikfunnik', role: 'user' }
        ];
        const teams = [
            {}
        ];
        return { heroes, accounts, teams };
    }

}