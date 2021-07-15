import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/_models/service';
import { ServicesService } from './services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  constructor(private serviceService: ServicesService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.serviceService.getServices().subscribe(services => {
      this.services = services;
    })
  }

}
