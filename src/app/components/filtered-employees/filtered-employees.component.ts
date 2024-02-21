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
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { NewCertDialogComponent } from '../new-cert-dialog/new-cert-dialog.component';

@Component({
  selector: 'app-filtered-employees',
  standalone: true,
  imports: [AvatarModule, AvatarGroupModule, CommonModule, ButtonModule, CertificationCardComponent, SideNavComponent, TabViewModule, AccordionModule, NewCertDialogComponent],
  templateUrl: './filtered-employees.component.html',
  styleUrl: './filtered-employees.component.scss'
})
export class FilteredEmployeesComponent implements OnInit{

  public employeeList:any = [];
  public cardsFlag:boolean = false;
  public certData:any = {};
  public showNavFlag:boolean=false;
  public tabs = ["Todo", "In Progress", "Completed"];
  public filteredObj:any = {};

  constructor(
    private usersService: UsersService,
    private router: Router,
    public globalService: GlobalStateService
    ){}

  ngOnInit(): void {
    this.employeeList = this.usersService.getEmployeeList();
    console.log('em lsit : ',this.employeeList)
    this.handleFilteredSelectedCertsByStatus();
  }

  handleFilteredSelectedCertsByStatus(){
    this.filteredObj = {
      'todo': [],
      'inprogress': [],
      'completed': []
    };
    const selectedCertName = this.globalService.filteredByCert;
    this.employeeList.forEach((emp:any)=>{
      const fCert = emp.certifications.find((cert:any)=>cert.certificationName==selectedCertName);
      switch (fCert?.status) {
        case 0:
            this.filteredObj['todo'].push(emp);
            break;
        case 1:
            this.filteredObj['inprogress'].push(emp);
            break;
        default:
            this.filteredObj['completed'].push(emp);
       }
    })

    console.log('filobj : ',this.filteredObj)
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
   }

   isCertAvailable(status: number): boolean {
    return this.certData.certifications.some((cert:any) => cert.status === status);
  }
  
}
