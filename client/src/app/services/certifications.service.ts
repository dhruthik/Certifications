import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CertificationsService {
  public baseURL:String = 'http://localhost:8080'
  constructor(private http:HttpClient) { }

  getCertifications(type:String):Observable<any>{
    return this.http.get<any>(this.baseURL+'/certifications?collectionName='+type);
  }
}
