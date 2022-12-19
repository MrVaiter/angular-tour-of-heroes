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
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });

    this.clearForm();
  }

  registerNewAccount() {
    

    this.genId();

    this.accountService.addAccount(this.newAccount!).subscribe(
      () => {
        this.accounts.push(this.newAccount!);
        this.router.navigate(['heroes']);
      }
    );
  }

  genId() {
    this.newAccount!.id = this.accounts.length + 1;
  }

  clearForm() {
    this.newAccount = {
      id: 0,
      login: "",
      email: "",
      password: "",
      role: "user"
    };
  }

}
