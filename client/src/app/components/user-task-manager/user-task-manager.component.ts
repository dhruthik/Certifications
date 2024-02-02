import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { UtilsService } from '../../services/utils.service';

@Component({
  selector: 'app-user-task-manager',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule, DialogModule],
  templateUrl: './user-task-manager.component.html',
  styleUrl: './user-task-manager.component.scss'
})
export class UserTaskManagerComponent implements OnInit{
  public visible:boolean = false;
  public certInBox:any = [{}]
  // public certificates:any = {
  //   // {
  //   //   "id": 1,
  //   //   "name": "Associate",
  //   //   "cost": "$75",
  //   //   "type": "Associates",
  //   //   "level": "Entry-level",
  //   //   "experience": "0-6 months",
  //   //   "prerequisite": "None",
  //   //   "startDate": "2024-02-01",
  //   //   "endDate": "2024-07-31"
  //   // },
  //   // {
  //   //   "id": 2,
  //   //   "name": "AI Associate",
  //   //   "cost": "$75",
  //   //   "type": "Associates",
  //   //   "level": "Entry-level",
  //   //   "experience": "1-2 years",
  //   //   "prerequisite": "None",
  //   //   "startDate": "2024-03-15",
  //   //   "endDate": "2025-03-14"
  //   // }
  //     "todo" : [
  //           {
  //             "id": 1,
  //             "name": "Associate",
  //             "cost": "$75",
  //             "type": "Associates",
  //             "level": "Entry-level",
  //             "experience": "0-6 months",
  //             "prerequisite": "None",
  //             "startDate": "",
  //             "endDate": "",
  //             "status": "todo"
  //           }
  //     ], 
  //     "inprogress":[
  //           {
  //             "id": 1,
  //             "name": "AI Associate",
  //             "cost": "$75",
  //             "type": "Associates",
  //             "level": "Entry-level",
  //             "experience": "1-2 years",
  //             "prerequisite": "None",
  //             "startDate": "2023-12-01",
  //             "endDate": "",
  //             "status": "inprogress"
  //           }
  //     ],
  //     "completed":[
  //       {
  //         "id": 1,
  //         "name": "Administrator",
  //         "cost": "$200",
  //         "type": "Admins",
  //         "level": "Mid-level",
  //         "experience": "1-2 years",
  //         "prerequisite": "Administrator credential",
  //         "startDate": "2023-02-01",
  //         "endDate": "2023-07-31",
  //         "status": "completed"
  //       }
  //     ]
  //   } 
  public certificates:any = []

  @Input() taskType:string = '';
  constructor(private utilsService: UtilsService){}

  ngOnInit(): void {
    console.log('task type : ',this.taskType)
    this.utilsService.currentCertificateDetails.subscribe(cert=>{
      this.certificates = cert;
      console.log('cer ; ',this.certificates)
    })
  }

  checkInfo(certificateData:any){
    this.visible = true;
    this.certInBox[0] = certificateData;
    console.log('box : ',certificateData, this.certInBox)
  }
  
}
