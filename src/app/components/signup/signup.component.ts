import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { 
  passwordError,
  usernameError,
  signUpUser
} from 'src/app/store/app.store'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  username: string = ''
  password: string = ''
  usernameErrorMessage$: Observable<string> = this._store.select(usernameError)
  passwordErrorMessage$: Observable<string> = this._store.select(passwordError)

  constructor(
    private _store: Store
  ) { }

  ngOnInit(): void {
  }

  signUp(): void {
    let usernameInput = this.username.trim()
    let passwordInput = this.password.trim()

    const newUser = {
        usernameInput,
        passwordInput
    }

    this._store.dispatch(signUpUser(newUser))
  }

}
