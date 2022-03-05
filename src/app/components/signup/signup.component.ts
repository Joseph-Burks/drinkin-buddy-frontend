import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';

import { UserService } from '../../services/user.service';
import { logInUser } from 'src/app/store/user.store'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  username: string = ''
  password: string = ''
  isMaker: boolean = false
  name: string = ''
  address: string = ''
  usernameErrorMessage: string = ''
  passwordErrorMessage: string = ''
  nameErrorMessage: string = ''
  addressErrorMessage: string = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private _store: Store
  ) { }

  ngOnInit(): void {
  }

  signUp(): void {
    this.usernameErrorMessage = ""
    this.passwordErrorMessage = ""
    let username = this.username.trim()
    let password = this.password.trim()

    const newUser = {
      user: {
        username,
        password
      }
    }
    this.userService.signUp(newUser)
      .subscribe((userData) => {
        if(userData.user){
          localStorage.setItem('token', userData.token)
          this._store.dispatch(logInUser(userData.user))
          this.router.navigate(['/dashboard'])
        } else {
          if(userData.error.username){
            this.usernameErrorMessage = `Username ${userData.error.username[0]}`
          }
          if(userData.error.password){
            this.passwordErrorMessage = `Password ${userData.error.password[0]}`
          }
        }
      });
  }

}
