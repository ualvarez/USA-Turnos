import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
}
