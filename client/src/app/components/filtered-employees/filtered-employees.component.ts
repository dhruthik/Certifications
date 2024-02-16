import { Component, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UsersService } from '../../services/users.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CertificationCardComponent } from '../certification-card/certification-card.component';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { GlobalStateService } from '../../services/global-state.service';

@Component({
  selector: 'app-filtered-employees',
  standalone: true,
  imports: [AvatarModule, AvatarGroupModule, CommonModule, ButtonModule, CertificationCardComponent, SideNavComponent],
  templateUrl: './filtered-employees.component.html',
  styleUrl: './filtered-employees.component.scss'
})
export class FilteredEmployeesComponent implements OnInit{

  public employeeList:any = [];
  public cardsFlag:boolean = false;
  public certData:any = {};
  public showNavFlag:boolean=false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    public globalService: GlobalStateService
    ){}

  ngOnInit(): void {
    this.employeeList = this.usersService.getEmployeeList();
    console.log('em lsit : ',this.employeeList)
  }

  viewDetails(empData:any){
    this.certData = empData;
    this.globalService.getSelectedEmployeeDetails$A(this.certData);
    this.cardsFlag = true;
  }

  back(){
    if(!this.cardsFlag){
      this.router.navigate(['admin']);
    }else{
      this.cardsFlag = false;
    }
  }

  onCertRemoved(certId: string) {
    const removedIndex = this.certData.certifications.findIndex((cert:any) => cert.cid === certId);
    if (removedIndex !== -1) {
      this.certData.certifications.splice(removedIndex, 1);
    }
  }

   onNavOpen(){
    this.globalService.showNavigationFlag=true;
    this.showNavFlag = this.globalService.showNavigationFlag
    console.log(this.globalService.showNavigationFlag)
    // if(!Object.keys(this.certificationsList).length){
    //  await this.globalService.handleCertificationsApi();
    //  this.certificationsList = this.globalService.certificationsList;
    // }
   }
}
