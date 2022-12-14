import { Injectable } from '@angular/core';

import { Account } from '../interfaces/account';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { MessageService } from './message.service';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = 'api/accounts';

  private _role: BehaviorSubject<string> = new BehaviorSubject<string>(document.cookie);
  get role(): Observable<string> {
    return this._role.asObservable();
  }
  set role(role: any) {
    this._role.next(role);
    document.cookie = role;
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl)
      .pipe(
        tap(_ => this.log('fetched accounts')),
        catchError(this.handleError<Account[]>('getAccounts', []))
      );
  }

  addAccount(newAccount: Account): Observable<Account> {
    return this.http.post<Account>(this.accountUrl, newAccount, this.httpOptions)
      .pipe(
        tap((newAcc: Account) => this.log(`added new account ${newAcc.id}|${newAcc.login}|${newAcc.email}`)),
        catchError(this.handleError<Account>('addAccount'))
      );
  }

  getAccount(login: string): Observable<Account[]> {
    const url = `${this.accountUrl}/?login=${login}`;

    return this.http.get<Account[]>(url)
      .pipe(
        tap(_ => this.log(`fetched account "${login}"`)),
        catchError(this.handleError<Account[]>(`getAccount`))
      );
  }

  searchAccounts(term: string): Observable<Account[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Account[]>(`${this.accountUrl}/?login=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found accounts matching "${term}"`) :
        this.log(`no accounts matching "${term}"`)),
      catchError(this.handleError<Account[]>(`searchAccounts`, []))
    );
  }

  private log(message: string) {
    this.messageService.add(`AccountService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }

}
