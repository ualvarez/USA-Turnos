import { Component, OnInit } from '@angular/core';
import { fakeAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  memberGalleryOptions: NgxGalleryOptions[];
  memberGalleryImages: NgxGalleryImage[];
  serviceGalleryOptions: NgxGalleryOptions[];
  serviceGalleryImages: NgxGalleryImage[];

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();

    this.memberGalleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]

    this.serviceGalleryOptions = [
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

  getMemberImages(): NgxGalleryImage[] {
    const imagerUrls = [];
    if (this.member?.photos != null) {
      for (const photo of this.member.photos) {
        imagerUrls.push({
          small: photo?.url,
          medium: photo?.url,
          big: photo?.url
        })
      }
    }

    return imagerUrls;
  }

  getServiceImages(): NgxGalleryImage[] {
    const imagerUrls = [];
    if (this.member?.services != null) {
      for (const service of this.member.services) {
        for (const photo of service.photos)
          imagerUrls.push({
            small: photo?.url,
            medium: photo?.url,
            big: photo?.url
          })
      }
    }
    return imagerUrls;
  }

  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')).subscribe(member => {
      this.member = member;
      this.memberGalleryImages = this.getMemberImages();
      this.serviceGalleryImages = this.getServiceImages();
    })
  }

}
