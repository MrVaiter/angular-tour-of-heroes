import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

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
    // If we want to instant redirect authorized users
    // if(document.cookie != ""){
    //   this.router.navigate(['heroes']);
    // }
  }

  authorize() {
    let searchLogin = this.myForm.get("userLogin")?.value;

    this.accountService.getAccount(searchLogin).subscribe(result => {

      if (Object.keys(result).length) {

        if (result[0].password == this.myForm.get("userPassword")?.value) {
          this.accountError = false;

          this.accountService.role = result[0].role;
          if (result[0].role == 'admin') { 

            this.router.navigate(['heroes']);
            
          } else {
            this.router.navigate(['heroes']);
          }

        }
        else {
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
