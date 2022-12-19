import { Component, OnInit } from '@angular/core';

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
    private accountService: AccountService) {
  }

  ngOnInit(): void {
    this.clearForm();

    this.accountService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }

  registerNewAccount() {
    
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
