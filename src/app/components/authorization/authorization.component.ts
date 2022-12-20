import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { isEmpty } from 'rxjs';
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
  accountError: boolean = false;
  errorMessage: string = "Error";

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
    let searchLogin = this.myForm.get("userLogin")?.value;

    this.accountService.getAccount(searchLogin).subscribe(result => {

      if (Object.keys(result).length) {

        if (result[0].password == this.myForm.get("userPassword")?.value) {
          this.accountError = false;
          this.router.navigate(['heroes']);
        }
        else{
          this.errorMessage = "Wrong password";
        }

      } else {
        this.errorMessage = "Unregistered login";
      }

      this.accountError = true;
    });
  }

  redirectToRegistration() {
    this.router.navigate(['registration']);
  }

  clearForm() {
    this.myForm.reset();
  }

  secondPasswordValidator(control: FormControl): { [s: string]: boolean } | null {

    if (this.myForm === undefined) {
      return null;
    }

    if (control.value != this.myForm.get('userPassword')?.value) {
      return { "secondPassword": true };
    }

    return null;
  }

}
