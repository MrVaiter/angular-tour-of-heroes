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
      "userPassword": new FormControl("", Validators.required),
      "secondPassword": new FormControl("", [Validators.required, this.secondPasswordValidator.bind(this)]) 
    });

  }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  authorize() {

  }

  redirectToRegistration() {
    this.router.navigate(['registration']);
  }

  clearForm() {
    this.myForm.reset();
  }

  secondPasswordValidator(control: FormControl): { [s: string]: boolean } | null {

    if(this.myForm === undefined){
      return null;
    }

    if(control.value != this.myForm.get('userPassword')?.value){
      return {"secondPassword": true};
    } 

    return null;
  }

}
