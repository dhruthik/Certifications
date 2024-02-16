import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public baseURL:String = 'http://localhost:8080';
  public employeeList:any;
  constructor(private http:HttpClient) { }

  getUsers(certName:string):Observable<any>{
    const url = certName ? '/users/'+certName : '/users'
    return this.http.get<any>(this.baseURL+ url);
  }

  updateUser(email:string,payload:any):Observable<any>{
    return this.http.post<any>(this.baseURL+'/update-user/'+email, payload);
  }

  updateCertStatus(email:string,payload:any):Observable<any>{
    return this.http.put<any>(this.baseURL+'/update-status/'+email, payload);
  }

  removeCertFromUser(email:string,cid:string){
    return this.http.delete<any>(this.baseURL+'/remove-cert?email='+email+'&cid='+cid);
  }

  setEmployeeList(list:any){
    this.employeeList = list;
  }

  getEmployeeList(){
    return this.employeeList;
  }

}
