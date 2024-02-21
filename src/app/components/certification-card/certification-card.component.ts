  import { CommonModule } from '@angular/common';
  import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
  import { StepsModule } from 'primeng/steps';
  import { DropdownModule } from 'primeng/dropdown';
  import { FormsModule } from '@angular/forms';
  import { UsersService } from '../../services/users.service';
  import { GlobalStateService } from '../../services/global-state.service';
  import { ConfirmationService, MessageService } from 'primeng/api';
  import { ConfirmDialogModule } from 'primeng/confirmdialog';
  import { ToastModule } from 'primeng/toast';
  import { DialogModule } from 'primeng/dialog';
  import { FileUploadModule } from 'primeng/fileupload';

  @Component({
    selector: 'app-certification-card',
    standalone: true,
    imports: [StepsModule, CommonModule, DropdownModule, FormsModule, ConfirmDialogModule, ToastModule, DialogModule, FileUploadModule],
    providers: [ MessageService, ConfirmationService ],
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
  public showInprogressDialog: boolean = false;
  @Input() certData:any = [];
  @Input() userId:number = 0;
  @Output() certRemoved = new EventEmitter<string>();
  
    constructor(private usersService : UsersService,
      public globalService : GlobalStateService,
      public messageService : MessageService,
      private confirmationService: ConfirmationService
      ){}

    ngOnInit(): void {
      this.activeIndex = this.certData.status;
      this.selectedState = this.taskStatus[this.activeIndex];
    }

    handleTasks(e:any){
      const activeIdx = this.taskStatus.findIndex((state:any)=>state.label == this.selectedState?.label);
      console.log('task : ',this.certData)
      if(activeIdx==2){
        return this.showInprogressUploadDialog();
      }
      this.certData.status = activeIdx;
      if(activeIdx!=0){
        this.certData[activeIdx === 1 ? 'startDate' : 'endDate'] = this.getDate();
      }
      this.usersService.updateCertStatus(this.userId,this.certData.cid,this.certData).subscribe({
        next:(res)=>{
          this.messageService.add({ severity: 'info', summary: 'Updated', detail: 'Updated the record' }); 
          console.log("Certificate status updated successfully",res);
          this.activeIndex = activeIdx;
        },
        error:(e)=>{
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while updating the record' });
          console.log("error updating the record : ",e);
        }
      });
    }

    showInprogressUploadDialog(){
      this.showInprogressDialog = true;
    }

    removeCert(e:Event){
      this.removeDialog(e);
    }

    removeDialog(event:Event){
      this.confirmationService.confirm({
        target: event.target as EventTarget,
        message: 'Do you want to delete this record?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        acceptButtonStyleClass:"p-button-danger p-button-text",
        rejectButtonStyleClass:"p-button-text p-button-text",
        acceptIcon:"none",
        rejectIcon:"none",

        accept: () => {
          console.log("remove : ",this.userId,this.certData.cid);
          this.usersService.removeCertFromUser(this.userId,this.certData.cid).subscribe({
          next:(res)=>{
              this.certRemoved.emit(this.certData.cid);
              console.log("Certificate deleted successfully",res);
            },
            error:(e)=>{
              console.log("error : ",e);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while deleting the record' });
            },
            complete:()=> {
              this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' }); 
            },
          });
        },
        reject: () => {
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
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

    getImage(): string {
      if (this.certData.cid.includes('sf')) {
        return 'salesforce.svg';
      } else if (this.certData.cid.includes('aws')) {
        return 'aws.png';
      } else {
        return 'java.png';
      }
    }

  }
