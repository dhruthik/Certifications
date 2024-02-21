import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import users from '../../models/users.json'
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CertificationCardComponent } from '../certification-card/certification-card.component';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { UsersService } from '../../services/users.service';
import { RadioButtonModule } from 'primeng/radiobutton';
import { Router } from '@angular/router';
import { GlobalStateService } from '../../services/global-state.service';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { NewCertDialogComponent } from '../new-cert-dialog/new-cert-dialog.component';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [AutoCompleteModule, ButtonModule, ToastModule, ReactiveFormsModule, FormsModule, CommonModule, AvatarModule, AvatarGroupModule, CertificationCardComponent, DropdownModule, RadioButtonModule, SideNavComponent, NewCertDialogComponent, TabViewModule ],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit{
  public users:any = users;
  public userForm: FormGroup = new FormGroup({});
  public userList :any = [];
  public certList :any = [];
  public showEmpContent:boolean = false;
  public empName:string = 'John';
  public techStack = ["Java","AWS", "SalesForce"];
  public techStackType:string = ''
  public certData:any = [];
  public categories: any[] = ['Employee', 'Certifications'];
  public categoryName:string='Employee';
  public certificationsList:any ={};
  public tabs = ["Todo", "In Progress", "Completed"];
  constructor(
     private usersService: UsersService,
     private router: Router,
     public globalService: GlobalStateService
     ){}

  ngOnInit(): void {
    this.userForm = this.globalService.userForm;
    this.globalService.isAdmin = true;
    this.usersService.getUsers('').subscribe({
      next:list=>{
      this.users = list;
      console.log('from service  :',list)
      },
      error:(e)=>{
        this.users = users;
      }
    })
    this.userForm.get('selectedCategory')?.patchValue("Employee")
    this.userForm.get('selectedCategory')?.valueChanges.subscribe((selectedValue) => {
      this.categoryName = selectedValue;
      if(!Object.keys(this.certificationsList).length && selectedValue == 'Certifications'){
        this.globalService.handleCertificationsApi();
        this.certificationsList = this.globalService.certificationsList;
       }
      this.userForm.patchValue({
        selectedData:null
      });
    });
  }

  filterEmployees(event:any){
    if(this.categoryName == 'Certifications'){
      this.certList = Object.values(this.certificationsList).flat().filter((cert:any)=>cert.certificationName.toLowerCase().indexOf(event.query.toLowerCase())>-1);
      return;
    }
    this.userList = this.users.filter((user:any)=>user.employeeName.toLowerCase().indexOf(event.query.toLowerCase())>-1);
  }

  onSubmit(){
    const radioText = this.userForm.get('selectedCategory')?.value;
    if(radioText == 'Certifications'){
      this.onSearchByCert();
      this.userForm.patchValue({selectedData:null});
      return;
    }
    this.empName = this.userForm.get('selectedData')?.value?.employeeName;
    if(!this.empName || this.empName==''){
      alert("Enter Valid name..");
      this.userForm.patchValue({selectedData:null});
      return;
    }
    let empId = this.userForm.get('selectedData')?.value.id;
    this.certData = this.users.find((emp:any)=>emp.id==empId);
    this.globalService.getSelectedEmployeeDetails$A(this.certData);
    console.log('cer : ',this.certData)
    this.showEmpContent = true;
    this.userForm.patchValue({selectedData:null});
  }

  goToMain(){
    this.showEmpContent = false;
    this.userForm.patchValue({selectedData:null});
  }

  async onNavOpen(){
   this.globalService.showNavigationFlag=true;
   if(!Object.keys(this.certificationsList).length){
    await this.globalService.handleCertificationsApi();
    this.certificationsList = this.globalService.certificationsList;
   }
  }

  handleTech(e:any){
    console.log(e);
    this.techStackType = e.value.toLowerCase();
  }

  onCertRemoved(certId: string) {
    const removedIndex = this.certData.certifications.findIndex((cert:any) => cert.cid === certId);
    if (removedIndex !== -1) {
      this.certData.certifications.splice(removedIndex, 1);
      this.globalService.getSelectedEmployeeDetails$A(this.certData);
    }
  }

  onSearchByCert(){
    let certName = this.userForm.get('selectedData')?.value.certificationName;
    if(!certName) return alert('enter valid name');
    this.globalService.filteredByCert = certName;
    this.usersService.getUsers(certName).subscribe({
      next:list=>{
      this.users = list;
      this.usersService.setEmployeeList(list);
      console.log('users by cert  :',list)
      if(!this.users.length){
        return alert("No certifications found");
      }
      this.router.navigate(['employee-list']);
      },
      error:(e)=>{
        this.users = users;
      }
    })
  }

  isCertAvailable(status: number): boolean {
    return this.certData.certifications.some((cert:any) => cert.status === status);
  }

}
