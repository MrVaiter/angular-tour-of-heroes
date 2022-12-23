import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Account } from '../../interfaces/account';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  newId: number = 0;
  myForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router) {

    this.myForm = new FormGroup({
      "userLogin": new FormControl("", [Validators.required, Validators.minLength(4)]),
      "userEmail": new FormControl("", [Validators.required, Validators.email]),
      "userPassword": new FormControl("", [Validators.required, Validators.minLength(8)])
    });

  }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(accounts => {
      this.newId = accounts.length + 1;
    });
  }

  registerNewAccount() {
    let newAccount: Account = {
      id: this.newId,
      login: this.myForm.controls['userLogin'].value,
      email: this.myForm.controls['userEmail'].value,
      password: this.myForm.controls['userPassword'].value,
      role: 'user'
    };

    this.accountService.addAccount(newAccount!).subscribe(
      () => {
        this.router.navigate(['authorization']);
      }
    );
  }

  clearForm() {
    this.myForm.reset();
  }

}
