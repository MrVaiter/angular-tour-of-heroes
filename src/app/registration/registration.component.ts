import { Component } from '@angular/core';
import { Account } from '../account';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  newAccount: Account | undefined;

  constructor(private messageService: MessageService) { }

  registerNewAccount(){}

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
