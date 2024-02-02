import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { UserTaskManagerComponent } from '../user-task-manager/user-task-manager.component';
import { SuggestionsComponent } from '../suggestions/suggestions.component';


@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [AvatarModule, AvatarGroupModule, ButtonModule, TableModule, CommonModule, DialogModule, UserTaskManagerComponent, SuggestionsComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit{
  public userData:any = {};
  public taskType:string = 'todo';
  public showSuggestionsFlag = false;
  public certificates:any = {
    // {
    //   "id": 1,
    //   "name": "Associate",
    //   "cost": "$75",
    //   "type": "Associates",
    //   "level": "Entry-level",
    //   "experience": "0-6 months",
    //   "prerequisite": "None",
    //   "startDate": "2024-02-01",
    //   "endDate": "2024-07-31"
    // },
    // {
    //   "id": 2,
    //   "name": "AI Associate",
    //   "cost": "$75",
    //   "type": "Associates",
    //   "level": "Entry-level",
    //   "experience": "1-2 years",
    //   "prerequisite": "None",
    //   "startDate": "2024-03-15",
    //   "endDate": "2025-03-14"
    // }
      "todo" : [
            {
              "id": 1,
              "name": "Associate",
              "cost": "$75",
              "type": "Associates",
              "level": "Entry-level",
              "experience": "0-6 months",
              "prerequisite": "None",
              "startDate": "",
              "endDate": "",
              "status": "todo"
            }
      ], 
      "inprogress":[
            {
              "id": 1,
              "name": "AI Associate",
              "cost": "$75",
              "type": "Associates",
              "level": "Entry-level",
              "experience": "1-2 years",
              "prerequisite": "None",
              "startDate": "2023-12-01",
              "endDate": "",
              "status": "inprogress"
            }
      ],
      "completed":[
        {
          "id": 1,
          "name": "Administrator",
          "cost": "$200",
          "type": "Admins",
          "level": "Mid-level",
          "experience": "1-2 years",
          "prerequisite": "Administrator credential",
          "startDate": "2023-02-01",
          "endDate": "2023-07-31",
          "status": "completed"
        }
      ]
    } 
  constructor(private utilsService: UtilsService){}
  
  ngOnInit(): void {
    // this.userData = this.utilsService.getSelectedUser();
    this.userData = {
      "id": 1,
      "employeeName": "John Doe",
      "age": 28,
      "DOB": "1994-05-15",
      "email": "john.doe@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "phoneNumber": "1234567890",
      "position": "Software Developer",
      "address": "123 Main Street, Cityville",
      "experience": 3,
      "documentsList":["Visa","Transcripts","IDs","Payslips"],
      "documents":{
            "Visa":[],
            "Transcripts":[],
            "IDs":[],
            "Payslips":[]
      }
    }
    this.utilsService.getCertificateDetails(this.certificates['todo']);
  }

  handleStatus(status:string){
    this.taskType = status;
    this.utilsService.getCertificateDetails(this.certificates[status]);
  }

  showSuggestions(){
    this.showSuggestionsFlag = !this.showSuggestionsFlag;
  }
}
