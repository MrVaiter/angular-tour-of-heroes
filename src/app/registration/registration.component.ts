import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Account } from '../account';
import { AccountService } from '../account.service';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  newAccount: Account | undefined;
  accounts: Account[] = [];

  constructor(
    private messageService: MessageService,
    private accountService: AccountService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.clearForm();

    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }

  registerNewAccount() {
    if(!this.newAccount){
      return;
    }

    return new Promise( (resolve, reject) => {
      this.accountService.addAccount(this.newAccount!).subscribe();
      resolve('heroes');
    }).then(
      (page) => {
        setTimeout(() => this.router.navigate([page]), 1000);
      }
    );
  }

  clearForm() {
    this.newAccount = {
      id: 3,
      login: "",
      email: "",
      password: "",
      role: "user"
    };
  }

}
