  import { CommonModule } from '@angular/common';
  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { StepsModule } from 'primeng/steps';
  import { DropdownModule } from 'primeng/dropdown';
  import { FormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { MessageService } from 'primeng/api';

  @Component({
    selector: 'app-certification-card',
    standalone: true,
    imports: [StepsModule, CommonModule, DropdownModule, FormsModule],
    providers:[MessageService],
    templateUrl: './certification-card.component.html',
    styleUrl: './certification-card.component.scss'
  })
  export class CertificationCardComponent implements OnInit{
    public taskStatus:any = [
      {
          label: 'ToDo',
          routerLink: ''
      },
      {
          label: 'In Progress',
          routerLink: ''
      },
      {
          label: 'Completed',
          routerLink: ''
      }
  ];
  public activeIndex: number = 0;
  public selectedState:any={};
  @Input() certData:any = [];
  @Input() email:string = '';
  @Output() certRemoved = new EventEmitter<string>();
  
    constructor(private usersService : UsersService,private messageService: MessageService){}

    ngOnInit(): void {
      this.activeIndex = this.certData.status;
      this.selectedState = this.taskStatus[this.activeIndex];
    }

    onActiveIndexChange(e:number){
      this.activeIndex = e;
    }

    handleTasks(e:any){
      this.activeIndex = this.taskStatus.findIndex((state:any)=>state.label == this.selectedState?.label);
      console.log('task : ',this.certData)
      this.certData.status = this.activeIndex;
      if(this.activeIndex!=0){
        this.certData[this.activeIndex === 1 ? 'startDate' : 'endDate'] = this.getDate();
      }
      this.usersService.updateCertStatus(this.email,this.certData).subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'info', summary: 'Updated', detail: 'Status updated!' });
          console.log("Certificate status updated successfully",res);
        },
        error:(e)=>{
          console.log("error : ",e);
        }
      });
    }

    removeCert(){
      console.log("remove : ",this.email,this.certData.cid);
      this.usersService.removeCertFromUser(this.email,this.certData.cid).subscribe({
        next:(res)=>{
          this.certRemoved.emit(this.certData.cid);
          this.messageService.add({ severity: 'warn', summary: 'Deleted', detail: 'certification removed!' });
          console.log("Certificate deleted successfully",res);
        },
        error:(e)=>{
          console.log("error : ",e);
        }
      });
    }

    getDate(){
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const day = currentDate.getDate();
      return `${year}-${month}-${day}`;
    }

  }
