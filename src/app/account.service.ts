import { Injectable } from '@angular/core';

import { Account } from './account';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';

import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = 'api/accounts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  getAllAccounts(): Observable<Account[]>{
    return this.http.get<Account[]>(this.accountUrl)
    .pipe(
      tap(_ => this.log('Fetched accounts'))
    );
  }

  private log(message: string) {
    this.messageService.add(`AccountService: ${message}`);
  }

}
