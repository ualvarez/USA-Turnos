import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { Service } from 'src/app/_models/service';
import { ServiceParams } from 'src/app/_models/serviceParams';
import { UserParams } from 'src/app/_models/userParams';

import { MembersService } from '../members/members.service';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  pagination: Pagination;
  serviceParams: ServiceParams;
  userParams: UserParams;
  selectedUser: string;
  members: Member[];
  orderList = [{ value: 'name', display: 'Nombre' }, { value: 'description', display: 'Descripción' }];

  constructor(private serviceService: ServicesService, private membersService: MembersService) {
    this.serviceParams = this.serviceService.getServiceParams();
    this.userParams = this.membersService.getUserParams();
  }

  ngOnInit(): void {
    this.loadServices();
    this.loadMembers();
  }


  loadServices() {
    this.serviceService.setServiceParams(this.serviceParams);
    this.serviceParams.username = this.selectedUser == undefined ? "" : this.selectedUser;
    this.serviceService.getServices(this.serviceParams).subscribe(response => {
      this.services = response.result;
      this.pagination = response.pagination;
    })
  }

  loadMembers() {  
    
    this.membersService.setUserParams(this.userParams);
    this.userParams.serviceName = "";
    
    this.membersService.getMembers(this.membersService.getUserParams()).subscribe(response => {
      this.members = response.result;      
    })
  }

  pageChanged(event: any) {
    this.serviceParams.pageNumber = event.page;
    this.serviceService.setServiceParams(this.serviceParams);
    this.loadServices();
  }

  
  resetFilters(){
    this.serviceParams = this.serviceService.resetServiceParams();
    this.selectedUser = "";
    this.loadMembers();

  }

}
