import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { CertificationCardComponent } from '../certification-card/certification-card.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';

@Component({
  selector: 'app-employee-page',
  standalone: true,
  imports: [PasswordModule, ReactiveFormsModule, CommonModule, ButtonModule, CertificationCardComponent, AvatarModule, AvatarGroupModule],
  templateUrl: './employee-page.component.html',
  styleUrl: './employee-page.component.scss'
})
export class EmployeePageComponent implements OnInit{
  public userLoginForm: FormGroup = this.fb.group({
    username :["John"],
    password:["test123"],
   });
   public isLoggedIn:boolean = false;
   public userData:any = [
    {
      "id": 1,
      "employeeName": "John Doe",
      "phoneNumber": "1234567890",
      "position": "Software Developer",
      "experience": 3,
      "techStack" : "Salesforce",
      "email": "john@abc.com",
      "certifications": [
        {
          "id": "certificateId1",
          "certificationName": "Associate",
          "status": 0,
          "cost": "$75",
          "type": "Associates",
          "level": "Entry-level",
          "experience": "0-6 months",
          "prerequisite": "None",
          "startDate": "",
          "endDate": ""
        },
        {
          "id": "certificateId2",
          "cost": "$75",
          "type": "Associates",
          "level": "Entry-level",
          "experience": "1-2 years",
          "prerequisite": "None",
          "startDate": "2023-12-01",
          "endDate": "",
          "certificationName": "AI Associate",
          "status": 1
        },
        {
          "id": "certificateId3",
          "cost": "$200",
          "type": "Admins",
          "level": "Mid-level",
          "experience": "1-2 years",
          "prerequisite": "Administrator credential",
          "startDate": "2023-02-01",
          "endDate": "2023-07-31",
          "certificationName": "Admin",
          "status": 2
        }
      ]
    }
   ]
   public certData:any
  constructor(private fb: FormBuilder){}

  ngOnInit(): void {
    this.certData = this.userData[0];
  }

  empLogin(){
    this.isLoggedIn = true;
  }
}
