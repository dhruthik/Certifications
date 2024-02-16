import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { GlobalStateService } from '../../services/global-state.service';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [ButtonModule, AvatarModule, AvatarGroupModule, CommonModule],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss'
})
export class SideNavComponent implements OnInit{

  public selectedEmpData:any = {};

  constructor(
    private globalService: GlobalStateService
    ){}

  ngOnInit(): void {
    this.globalService.currentSelectedEmployeeDetails$A.subscribe({
      next: (data)=>{
        this.selectedEmpData = data;
      }
    })
  }

  onNavClose(){
    this.globalService.showNavigationFlag = false;
  }

  onAddCert(){
    this.globalService.showDialogFlagInAddCert = true;
    this.globalService.showNavigationFlag=false;
  }

}
