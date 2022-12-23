import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  isAdmin = document.cookie == 'admin';
  isShaded = false;

  teams: Team[] = [];
  players: Account[] = [];
  myForm: FormGroup;

  selectedTeam: Team = {} as Team;
  freePlayers: Account[] = [];

  constructor(
    private teamService: TeamService,
    private playerService: AccountService) {

    this.myForm = new FormGroup({
      "teamName": new FormControl("", [Validators.required, Validators.minLength(4)])
    });
  }

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });

    this.playerService.getAccounts().subscribe(accounts => {
      this.players = accounts.filter(account => account.role == 'user');
    });
  }

  addTeam() {

    let newTeam: Team = {
      id: this.teams.length + 1,
      name: this.myForm.get('teamName')?.value,
      members: []
    };

    this.teamService.addTeam(newTeam).subscribe(_ => {
      this.teams.push(newTeam)
    });
  }

  showAddPlayersPanel(team: Team) {
    this.isShaded = true;

    this.selectedTeam = team;

    let indexArray: number[] = [];
    team.members.forEach(member => indexArray.push(member.id));

    this.freePlayers = this.players.filter(player => !indexArray.includes(player.id));
  }

  addPlayerToTeam(player: Account, team: Team){

    const teamId = this.teams.indexOf(team);

    this.teams[teamId].members.push(player);

    this.teamService.updateTeam(this.teams[teamId]).subscribe(() => {
      this.isShaded = false;
    });
  }

  removePlayerFromTeam(player: Account, team: Team){
    const teamId = this.teams.indexOf(team);
    const memberId = this.teams[teamId].members.indexOf(player);

    this.teams[teamId].members.splice(memberId, 1);

    this.teamService.updateTeam(this.teams[teamId]).subscribe(() => {
      this.isShaded = false;
    });
  }

}
