import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.css']
})
export class NavHeaderComponent implements OnInit {
model: any = {}


  constructor(public accountService: AccountService) { }

  ngOnInit(): void {   
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
      console.log(response);      
    }, error =>{
      console.log(error);
    })
  }

  logout(){    
    this.accountService.logout();
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user => {
    }, error => {
      console.log(error);
    })
  }

}
