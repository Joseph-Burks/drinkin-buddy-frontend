import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { User } from '../../models/user'

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  @Input() user?: User

  constructor(private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    if(localStorage['token']){
      this.location.go('/dashboard')
    }
  }

}
