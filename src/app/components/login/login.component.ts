import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store';

import { UserService } from '../../services/user.service';
import { logInUser } from 'src/app/store/user.store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username = ""
  password = ""
  errorMessage = ""

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
    private _store: Store
  ) { }

  ngOnInit(): void {
  }

  logIn(): void {
    this.errorMessage = ""
    let username = this.username.trim()
    let password = this.password.trim()

    const userInfo = {
      user: {
        username,
        password
      }
    }
    this.userService.logIn(userInfo)
      .subscribe((userData) => {
        if(userData.user){
          localStorage.setItem('token', userData.token)
          this._store.dispatch(logInUser(userData.user))
          this.router.navigate(['/dashboard'])
        } else {
          this.errorMessage = userData.error
        }
      });
  }

}
