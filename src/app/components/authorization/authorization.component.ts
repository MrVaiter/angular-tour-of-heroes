import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Account } from 'src/app/interfaces/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent {

  accounts: Account[] = [];
  myForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router) {

    this.myForm = new FormGroup({
      "userLogin": new FormControl("", Validators.required),
      "userPassword": new FormControl("", Validators.required)
    });

  }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  authorize(){
    alert('Hi');
  }

  redirectToRegistration(){
    this.router.navigate(['registration']);
  }

  clearForm() {
    this.myForm.reset();
  }

}
