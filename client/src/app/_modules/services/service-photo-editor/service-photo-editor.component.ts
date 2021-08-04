import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs/operators';
import { Photo } from 'src/app/_models/photo';
import { Service } from 'src/app/_models/service';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-service-photo-editor',
  templateUrl: './service-photo-editor.component.html',
  styleUrls: ['./service-photo-editor.component.css']
})
export class ServicePhotoEditorComponent implements OnInit {
  @Input() service: Service;
  uploader: FileUploader;
  hasBaseDropzoneOver = false;
  baseUrl = environment.apiUrl;
  user: User;

  constructor(private accountService: AccountService, private serviceService: ServicesService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user);
  }

  ngOnInit(): void {
    this.intializeUploader();
  }

  fileOverBase(e: any) {
    this.hasBaseDropzoneOver = e;
  }

  intializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'services/add-photo?name=' + this.service.name,
      parametersBeforeFiles: true,
      authToken: 'Bearer ' + this.user.token,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.service.photos.push(photo);
      }
    }
  }

  setMainPhoto(photo: Photo) {
    this.serviceService.setMainPhoto(photo.id, this.service.name).subscribe(() => {
      this.service.photoUrl = photo.url;      
      this.service.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      })
    })
  }

  deletePhoto(photoId: Number){
    this.serviceService.deletePhoto(photoId).subscribe(() =>{
      this.service.photos = this.service.photos.filter(x => x.id !== photoId);
    })
  }



}
