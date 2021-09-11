import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { PaginatedResult } from 'src/app/_models/pagination';
import { Service } from 'src/app/_models/service';
import { ServiceParams } from 'src/app/_models/serviceParams';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  baseUrl = environment.apiUrl;
  services: Service[] = [];
  serviceCache = new Map();
  serviceParams: ServiceParams;
  user: User;

  constructor(private http: HttpClient, private accountService: AccountService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => {
      this.user = user;
      this.serviceParams = new ServiceParams();
    })
  }

  getServiceParams(){
    return this.serviceParams;
  }

  setServiceParams(params : ServiceParams){
    this.serviceParams = params;
  }

  resetServiceParams(){
    this.serviceParams = new ServiceParams();
    return this.serviceParams;
  }


  getServices(serviceParams: ServiceParams) {
    var response = this.serviceCache.get(Object.values(serviceParams).join('-'));
    if(response){
      return of(response);
    }

    let params = this.getPaginationHeaders(serviceParams.pageNumber, serviceParams.pageSize);

    params = params.append('username', serviceParams.username);

    params = params.append('orderBy', serviceParams.orderBy);

    return this.getPaginatedResult<Service[]>(this.baseUrl + 'services', params).pipe(map(response => {
      this.serviceCache.set(Object.values(serviceParams).join('-'), response);
      return response;
    }));
    
  }

  private getPaginatedResult<T>(url, params) {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    //observer: 'response' es para que el metodo get de http retorne todo el response, caso contrario retorna solo el body  
    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getPaginationHeaders(pageNumber: number, pageSize: number) {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());


    return params
  }


  getServicesByUsername(username: string) {
    return this.http.get<Service>(this.baseUrl + 'services/' + username);
  }

  getService(name: string) {
    
    const service = [...this.serviceCache.values()]
    .reduce((arr, elem)=> arr.concat(elem.result),[])
    .find((service: Service) => service.name === name);
    if(service){
      return of(service);
    }
    
    return this.http.get<Service>(this.baseUrl + 'services/' + name);

  }

  updateService(service: Service) {
    return this.http.put(this.baseUrl + 'services', service).subscribe(response => { console.log(response) }, error => { console.log(error) }, () => console.log('COMPLETE!!!'))

  }

  setMainPhoto(photoId: Number, name: string) {
    var params = new HttpParams();
    params.append("photoId", photoId.toString());
    params.append("name", name);
    return this.http.put(this.baseUrl + 'services/set-main-photo/' + photoId + '?name=' + name, { });
  }

  deletePhoto(photoId: Number) {
    return this.http.delete(this.baseUrl + 'services/delete-photo/' + photoId);
  }
}
