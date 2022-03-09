import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';


import { UserService } from '../../services/user.service';
import { 
  passwordError,
  usernameError,
  signUpUser,

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
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private userService: UserService,
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
  //   this.userService.signUp(newUser)
  //     .subscribe((userData) => {
  //       if(userData.user){
  //         localStorage.setItem('token', userData.token)
  //         this._store.dispatch(logInUser(userData.user))
  //         this.router.navigate(['/dashboard'])
  //       } else {
  //         if(userData.error.username){
  //           this.usernameErrorMessage = `Username ${userData.error.username[0]}`
  //         }
  //         if(userData.error.password){
  //           this.passwordErrorMessage = `Password ${userData.error.password[0]}`
  //         }
  //       }
  //     });
  }

}
