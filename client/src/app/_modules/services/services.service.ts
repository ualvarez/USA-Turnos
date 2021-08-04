import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Service } from 'src/app/_models/service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl = environment.apiUrl;
  services: Service[] = [];

  constructor(private http: HttpClient) { }

  getServices() {
    return this.http.get<Service[]>(this.baseUrl + 'services');
  }


  getServicesByUsername(username: string) {
    return this.http.get<Service>(this.baseUrl + 'services/' + username);
  }

  getService(name: string) {
    return this.http.get<Service>(this.baseUrl + 'services/' + name);
  }

  updateService(service: Service) {
    return this.http.put(this.baseUrl + 'services', service).subscribe(response => {console.log(response) }, error =>{ console.log(error)}, () => console.log('COMPLETE!!!') )

  }

  setMainPhoto(photoId : Number, name: string){
    var params = new HttpParams();
    params.append("photoId", photoId.toString());
    params.append("name", name);
    return this.http.put(this.baseUrl + 'services/set-main-photo/' + photoId + '?name=' + name,{});
  }

  deletePhoto(photoId: Number) {
    return this.http.delete(this.baseUrl + 'services/delete-photo/' + photoId);
  }
}
