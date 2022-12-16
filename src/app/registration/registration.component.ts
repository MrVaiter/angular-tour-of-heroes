import { Component } from '@angular/core';
import { Account } from '../account';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent{

  newAccount?: Account;

  constructor(private messageService: MessageService){ }

  clearForm(){
    this.newAccount = {
      login: "",
      email: "",
      password: ""
    };
  }

}
