import { Injectable } from "@angular/core";
import { InMemoryDbService } from "angular-in-memory-web-api";

@Injectable({
    providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

    createDb() {
        const heroes = [
            { id: 1, name: 'Tornado' },
            { id: 2, name: 'Dr. Nice' },
            { id: 3, name: 'Bombasto' },
            { id: 4, name: 'Celeritas' },
            { id: 5, name: 'Magneta' },
            { id: 6, name: 'RubberMan' },
            { id: 7, name: 'Dynama' },
            { id: 8, name: 'Dr. IQ' },
            { id: 9, name: 'Magma' }
        ];
        const accounts = [
            { id: 1, login: 'admin', email: 'admin@admin', password: 'adminadmin', role: 'admin' },
            { id: 2, login: 'user', email: 'user@user', password: 'useruser', role: 'user' },
            { id: 3, login: 'dendi', email: 'dendi@dendi', password: 'dendidendi', role: 'user' },
            { id: 4, login: 'XBOCT', email: 'xboct@xboct', password: 'xboctxboct', role: 'user' },
            { id: 5, login: 'Lost', email: 'lost@lost', password: 'lostlost', role: 'user' },
            { id: 6, login: 'ArtStyle', email: 'artsyle@artsyle', password: 'artsyleartsyle', role: 'user' },
            { id: 7, login: 'Puppey', email: 'puppey@puppey', password: 'puppeypuppey', role: 'user' }

        ];
        const teams = [
            { id: 1, name: 'NaVi 2011', members: [accounts[2], accounts[3], accounts[4]] },
            { id: 2, name: 'CTAPIKI', members: [accounts[5], accounts[6]] }
        ];
        return { heroes, accounts, teams };
    }

}