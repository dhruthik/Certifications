import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificationsService {
  // public baseURL:String = 'http://localhost:8080'

  public baseURL:string = 'http://18.188.176.26:8080/api';
  
  constructor(private http:HttpClient) { }

  getCertifications(type:String):Observable<any>{
    return this.http.get<any>(this.baseURL+'/certifications?collectionName='+type);
  }
}
