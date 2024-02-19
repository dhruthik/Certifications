import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  private selectedUser: any;
  private certificateDetails = new BehaviorSubject<[]>([]);
  currentCertificateDetails = this.certificateDetails.asObservable();

  constructor() { }

  setSelectedUser(user: any){
    this.selectedUser = user;
  }

  getSelectedUser(): any {
    return this.selectedUser;
  }

  getCertificateDetails(taskType: any) {
    this.certificateDetails.next(taskType);
  }
}
