import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { Service } from 'src/app/_models/service';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { ServicesService } from '../services/services.service';
import { MembersService } from './members.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
userParams: UserParams;
user: User;
services: Service[];
selectedService: string;
orderList= [{ value: 'lastActive', display: 'Usuario activo' }, { value: 'created', display: 'Usuarios nuevos' }];

  constructor(private memberService: MembersService, private serviceService: ServicesService) {
  this.userParams = this.memberService.getUserParams();
   }

  ngOnInit(): void {
    this.loadMembers();
    this.loadServices();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams);
    this.userParams.serviceName = this.selectedService;
    this.memberService.getMembers(this.userParams).subscribe(response => {
      this.members = response.result;
      this.pagination = response.pagination;
    })
  }

  loadServices() {
  
    this.serviceService.getServices(this.serviceService.getServiceParams()).subscribe(response => {              
      this.services = response.result;
    })
  }

  resetFilters(){
    this.userParams = this.memberService.resetUserParams();
    this.selectedService = "";
    this.loadMembers();

  }

  pageChanged(event: any){
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }


}
