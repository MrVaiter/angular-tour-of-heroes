import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Account } from '../account';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  accounts: Account[] = [];
  myForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router) {

    this.myForm = new FormGroup({
      "userLogin": new FormControl("", Validators.required),
      "userEmail": new FormControl("", [Validators.required, Validators.email]),
      "userPassword": new FormControl("", Validators.required)
    });

  }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });

    this.clearForm();
  }

  registerNewAccount() {
    let newAccount: Account = {
      id: this.accounts.length + 1,
      login: this.myForm.controls['userLogin'].value,
      email: this.myForm.controls['userEmail'].value,
      password: this.myForm.controls['userPassword'].value,
      role: 'user'
    };

    this.accountService.addAccount(newAccount!).subscribe(
      () => {
        this.router.navigate(['heroes']);
      }
    );
  }

  clearForm() {
    this.myForm.reset();
  }

}
