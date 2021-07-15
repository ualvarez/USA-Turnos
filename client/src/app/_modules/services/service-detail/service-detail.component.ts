import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/_models/service';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { ServicesService } from '../services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.css']
})
export class ServiceDetailComponent implements OnInit {

  service: Service;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  

  constructor(private serviceService: ServicesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadService();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
   
  }

  getImages(): NgxGalleryImage[]{
    const imagerUrls=[];
    for(const photo of this.service.photos){
      imagerUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url
      })
    }

    return imagerUrls;
  }


  loadService() {
    this.serviceService.getService(this.route.snapshot.paramMap.get('name')).subscribe(service => {
      this.service = service;
      this.galleryImages = this.getImages();        
    })
  }


}
