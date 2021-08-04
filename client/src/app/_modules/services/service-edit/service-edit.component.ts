import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Service } from 'src/app/_models/service';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
service: Service;

  constructor(private toastr: ToastrService, private serviceService: ServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadService();
  }

  loadService(){
    this.serviceService.getService(this.route.snapshot.paramMap.get("name")).subscribe(service => {
      this.service = service;
      console.log(this.service);
    })
  }

  updateService(){
   this.serviceService.updateService(this.service);
    this.toastr.success('Servicio actualizado con éxitoaaa');
    this.editForm.reset(this.service);  
  }

}
