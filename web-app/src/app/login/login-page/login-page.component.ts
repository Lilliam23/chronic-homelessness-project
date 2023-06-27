import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public isAuthenticated: boolean = false;
  reactiveForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.reactiveForm = new FormGroup({
    //   email: new FormGroup(null, Validators.required)

    });
  }

  logout() {

  }
  login() {

  }
}
