import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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


  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {   
  }

  login(){
    this.accountService.login(this.model).subscribe(response => {
     this.router.navigateByUrl('/services'); 
    })
  }

  logout(){    
    this.accountService.logout(); 
    this.router.navigateByUrl('/');
  }

  getCurrentUser(){
    this.accountService.currentUser$.subscribe(user => {
    }, error => {
      console.log(error);
    })
  }

}
