import { Component, OnInit } from '@angular/core';
import { Account } from 'src/app/interfaces/account';

import { Team } from 'src/app/interfaces/team';
import { AccountService } from 'src/app/services/account.service';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-teams-list',
  templateUrl: './teams-list.component.html',
  styleUrls: ['./teams-list.component.css']
})
export class TeamsListComponent implements OnInit {

  teams: Team[] = [];
  players: Account[] = []

  constructor(
    private teamService: TeamService,
    private playerService: AccountService) { }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
      console.log(this.teams);
    });

    this.playerService.getAccounts().subscribe(accounts => {
      this.players = accounts.filter(account => account.role == 'user');
      console.log(this.players);
    });
  }

}
