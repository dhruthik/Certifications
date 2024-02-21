import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  // public baseURL:string = 'http://localhost:8080';
  public baseURL:string = 'http://18.188.176.26:8080/api';
  public employeeList:any;
  constructor(private http:HttpClient) { }

  getUsers(certName:string):Observable<any>{
    // let url=''
    // if(certName){
    //    this.baseURL = 'http://localhost:8080';
    //    url = "/users/"+certName;
    // }else{
    //   url  = "/users"
    // }
    const url = certName ? '/users/user/'+certName : '/users'
    return this.http.get<any>(this.baseURL+ url);
  }

  updateUser(id:number,payload:any):Observable<any>{
    return this.http.patch<any>(this.baseURL +'/users/'+ id +'/addc', payload);
  }

  updateCertStatus(id:number,cid:string,payload:any):Observable<any>{
    return this.http.put<any>(this.baseURL +'/users/'+ id +'/update-certification?certificationId='+cid , payload);
  }

  removeCertFromUser(id:number,cid:string){
    return this.http.delete<any>(this.baseURL +'/users/'+id+'/deletec?certificationId='+cid);
  }

  setEmployeeList(list:any){
    this.employeeList = list;
  }

  getEmployeeList(){
    return this.employeeList;
  }

}
