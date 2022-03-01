import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Store } from '@ngrx/store'
;
import { UserService } from './services/user.service';
import { logInUser } from './store/user.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "Drinkin' Buddy";

  constructor(private userService: UserService, private _store: Store, private router: Router){}

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void { this.userService.getUser()
    .subscribe((user) => {
      console.log(user)
      if(user.username){
        this._store.dispatch(logInUser(user))
        this.router.navigate(['/dashboard'])
      }
    });
  }
}
