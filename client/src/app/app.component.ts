import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The USA-Turnos App';
  users: any;
  public  isCollapsed: boolean = true;
  NavisCollapsed = false;
  active = 'top';

  
  constructor(public accountService : AccountService) { 

  }
  

  someFn(event: any){}

  ngOnInit() {   
    this.setCurrentUser();
  }

  setCurrentUser(){
    const user: User = JSON.parse(localStorage.getItem('user'));
    this.accountService.setCurrentUser(user);
  }
 

  


}