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
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [AutoCompleteModule, ButtonModule, ToastModule, ReactiveFormsModule, FormsModule, CommonModule, AvatarModule, AvatarGroupModule, CertificationCardComponent, DropdownModule],
  providers:[MessageService],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit{
  public users:any = users;
  public userForm: FormGroup = this.fb.group({
   selectedUser :[""],
   selectedStack:[""],
   selectedCertification:[""]
  });
  public userList :any = [];
  public showEmpContent:boolean = false;
  public empName:string = 'John';
  public showNav:boolean = false;
  public showDialog:boolean = false;
  public techStack = ["Java","AWS", "SalesForce","UI"];
  public certificationNames: string[] = [
    'Associate',
    'AI Associate',
    'Administrator',
    'Advanced Administrator',
    'Platform App Builder',
    'CPQ Specialist',
    'Business Analyst',
    'User Experience (UX) Designer',
    'Strategy Designer',
    'Service Cloud Consultant',
    'Data Cloud Consultant',
    'Sales Cloud Consultant',
    'Field Service Consultant',
    'Experience Cloud Consultant',
    'Tableau CRM and Einstein Discovery Consultant',
    'Nonprofit Cloud Consultant',
    'Education Cloud Consultant',
    'OmniStudio Consultant',
    'Identity and Access Management Architect',
    'Sharing and Visibility Architect',
    'Development Lifecycle and Deployment Architect',
    'Heroku Architect'
  ];
  public certData:any = []
//   {
//     "id": 1,
//     "employeeName": "John Doe",
//     "phoneNumber": "1234567890",
//     "position": "Software Developer",
//     "experience": 3,
//     "techStack" : "Salesforce",
//     "email": "john@abc.com",
//     "certifications": [
//         {
//             "id": "certificateId1",
//             "certificationName": "Associate",
//             "status": 0,
//             "cost": "$75",
//             "type": "Associates",
//             "level": "Entry-level",
//             "experience": "0-6 months",
//             "prerequisite": "None",
//             "startDate": "",
//             "endDate": ""
//         },
//         {
//             "id": "certificateId2",
//             "cost": "$75",
//             "type": "Associates",
//             "level": "Entry-level",
//             "experience": "1-2 years",
//             "prerequisite": "None",
//             "startDate": "2023-12-01",
//             "endDate": "",
//             "certificationName": "AI Associate",
//             "status": 1
//         },
//         {
//             "id": "certificateId3",
//             "cost": "$200",
//             "type": "Admins",
//             "level": "Mid-level",
//             "experience": "1-2 years",
//             "prerequisite": "Administrator credential",
//             "startDate": "2023-02-01",
//             "endDate": "2023-07-31",
//             "certificationName": "Admin",
//             "status": 2
//         }
//     ]
// }
  constructor(private fb: FormBuilder, private messageService: MessageService){}

  ngOnInit(): void {
    
  }

  filterEmployees(event:any){
    this.userList = this.users.filter((user:any)=>user.employeeName.toLowerCase().indexOf(event.query.toLowerCase())>-1);
  }

  onSubmit(){
    this.empName = this.userForm.get('selectedUser')?.value.employeeName;
    if(!this.empName || this.empName==''){
      alert("Enter Valid name..");
      return;
    }
    let empId = this.userForm.get('selectedUser')?.value.id;
    this.certData = this.users.find((emp:any)=>emp.id==empId);
    console.log('cer : ',this.certData)
    this.showEmpContent = true;
  }

  onNavClose(){
   this.showNav=false;
  }
  onNavOpen(){
   this.showNav=true;
  }
  onDialogClose(){
    this.showDialog = false;
    this.userForm.patchValue({
      selectedStack:null,
      selectedCertification:null
    });
  }
  onAddCert(){
    if(!this.showDialog){
      this.showDialog = true;
      this.showNav=false;
      return;
    }
    const mockNewCert = {
      "id": "certificateId1",
      "certificationName": "New Certification",
      "status": 0,
      "cost": "$75",
      "type": "Associates",
      "level": "Entry-level",
      "experience": "0-6 months",
      "prerequisite": "None",
      "startDate": "",
      "endDate": ""
    }
    this.users[0].certifications.unshift(mockNewCert);
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification Added' });
    this.showDialog = false;
  }
}
