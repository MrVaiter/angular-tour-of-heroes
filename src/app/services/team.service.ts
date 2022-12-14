import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

import { MessageService } from './message.service';

import { catchError, Observable, of, tap } from 'rxjs';

import { Team } from '../interfaces/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamUrl = 'api/teams';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }

  getTeams(): Observable<Team[]>{
    return this.http.get<Team[]>(this.teamUrl)
    .pipe(
      tap(_ => this.log('fetched teams')),
      catchError(this.handleError<Team[]>(`getTeams`))
    );
  }

  addTeam(newTeam: Team): Observable<Team>{
    return this.http.post<Team>(this.teamUrl, newTeam, this.httpOptions)
    .pipe(
      tap((newTeam: Team) => this.log(`added new team ${newTeam.id}|${newTeam.name}`)),
      catchError(this.handleError<Team>('addTeam'))
    );
  }

  updateTeam(team: Team): Observable<any>{
    return this.http.put(this.teamUrl, team, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated team id=${team.id}`)),
      catchError(this.handleError<any>('updateTeam'))
    );
  }

  searchTeams(term: string): Observable<Team[]> {
    if (!term.trim()) {
      return of([]);
    }

    return this.http.get<Team[]>(`${this.teamUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found teams matching "${term}"`) :
        this.log(`no teams matching "${term}"`)),
      catchError(this.handleError<Team[]>(`searchTeams`, []))
    );
  }

  private log(message: string) {
    this.messageService.add(`TeamService: ${message}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    }
  }
}
