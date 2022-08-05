/********************************************************************************* * 
 * WEB422 – Assignment 06 
 * 
 * I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part of this 
 * Assignment has been copied manually or electronically from any other source (including web sites) or 
 * Distributed to other students. 
 * 
 * Name: Jatinderpal Singh Student ID: 155892201 Date: 08/05/2022
*
* Angular App (Deployed) Link: https://web422-assign6-one.vercel.app/
*
* User API (Heroku) Link: https://murmuring-earth-43995.herokuapp.com  
* 
********************************************************************************/

import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, Event } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  searchString: string = "";
  public token: any;

  handleSearch(){
    if(this.searchString != ""){
      this.router.navigate(['/search'],{queryParams:{q:this.searchString}})
      this.searchString = "";
    }
  }

  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }

  title = 'music-app';
  constructor( private router: Router, private auth: AuthService){}

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) { // only read the token on "NavigationStart"
        this.token = this.auth.readToken();
      }
    });
  }
}
