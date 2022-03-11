import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { errorMessage } from '../../store/app.store';
import { logInUser } from '../../store/actions/user.actions'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username = ''
  password = ''
  errorMessage$: Observable<string> = this._store.select(errorMessage)

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
  }

  logIn(): void {
    let usernameInput = this.username.trim()
    let passwordInput = this.password.trim()

    const userInput = {
      usernameInput,
      passwordInput
    }

    this._store.dispatch(logInUser(userInput))
  }

}
