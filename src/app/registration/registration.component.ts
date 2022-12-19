import { Component } from '@angular/core';

import { Account } from '../account';
import { AccountService } from '../account.service';

import { MessageService } from '../message.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  newAccount: Account = {
    id: 3,
    login: '',
    email: '',
    password: '',
    role: 'user'
  };

  constructor(
    private messageService: MessageService,
    private accountService: AccountService) { 
      
    }

  registerNewAccount(){
    this.accountService.getAllAccounts
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
