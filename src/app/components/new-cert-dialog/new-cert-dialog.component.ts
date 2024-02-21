import { Component, OnInit } from '@angular/core';
import { GlobalStateService } from '../../services/global-state.service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-cert-dialog',
  standalone: true,
  imports: [ToastModule, DropdownModule, ReactiveFormsModule, ButtonModule, CommonModule],
  providers: [ MessageService ],
  templateUrl: './new-cert-dialog.component.html',
  styleUrl: './new-cert-dialog.component.scss'
})
export class NewCertDialogComponent implements OnInit{

  public selectedEmpData:any = {};
  public userForm: FormGroup = new FormGroup({});
  public techStackType:string = '';
  public techStack = ["Java","AWS", "SalesForce"];
  public certificationsList:any ={};

  constructor(
    private globalService: GlobalStateService,
    private usersService: UsersService,
    public messageService : MessageService
  ){}

  ngOnInit(): void {
    this.globalService.currentSelectedEmployeeDetails$A.subscribe({
      next: (data)=>{
        this.selectedEmpData = data;
      }
    })
    this.userForm = this.globalService.userForm;
    this.certificationsList = this.globalService.certificationsList;
  }

  onAddCert(){
    const newSelectedCertificate = this.globalService.userForm.get("selectedCertification")?.value;
    newSelectedCertificate.status = 0;
    console.log(this.selectedEmpData.id, this.globalService.userForm.get("selectedCertification")?.value)
    this.usersService.updateUser(this.selectedEmpData.id, newSelectedCertificate).subscribe({
      next:(res)=>{
        console.log("updated successfully : ",res);
        this.messageService.add({ severity: 'info', summary: 'Updated', detail: 'New Certification added' }); 
        this.selectedEmpData.certifications.push(newSelectedCertificate);
      },
      error:error=>{
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error occured while add new record' });
        console.log("error updating the data : ",error);
      }
    });
    this.userForm.patchValue({
      selectedStack:null,
      selectedCertification:null
    });
    this.globalService.showDialogFlagInAddCert = false;
  }

  handleTech(e:any){
    console.log(e);
    this.techStackType = e.value.toLowerCase();
  }

  onDialogClose(){
    this.globalService.showDialogFlagInAddCert = false;
    this.userForm.patchValue({
      selectedStack:null,
      selectedCertification:null
    });
  }

}
