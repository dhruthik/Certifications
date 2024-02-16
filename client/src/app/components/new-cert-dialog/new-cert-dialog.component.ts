import { Component, OnInit } from '@angular/core';
import { GlobalStateService } from '../../services/global-state.service';
import { MessageService } from 'primeng/api';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-cert-dialog',
  standalone: true,
  imports: [ToastModule, DropdownModule, ReactiveFormsModule, ButtonModule, CommonModule],
  providers:[MessageService],
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
    private messageService: MessageService,
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
    console.log(this.selectedEmpData.email, this.globalService.userForm.get("selectedCertification")?.value)
    this.usersService.updateUser(this.selectedEmpData.email, newSelectedCertificate).subscribe({
      next:(res)=>{
        console.log("updated successfully : ",res);
        this.selectedEmpData.certifications.push(newSelectedCertificate);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Certification Added' });
      },
      error:error=>{
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Certification already exists' });
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
