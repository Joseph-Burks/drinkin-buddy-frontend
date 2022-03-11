import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store'
;
import { UserService } from './services/user.service';
import { loadUserWithToken, userLoadedSuccess } from './store/actions/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Drinkin' Buddy";

  constructor(private userService: UserService, private _store: Store, private router: Router){}

  ngOnInit(): void {
    if(localStorage['token']){
      this.getUser()
    }
  }

  getUser(): void {
    this._store.dispatch(loadUserWithToken())
    this.router.navigate(['/dashboard'])
  }
}
