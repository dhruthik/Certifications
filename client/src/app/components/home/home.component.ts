import { Component, OnInit } from '@angular/core';
import users from '../../models/users.json';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AvatarModule, AvatarGroupModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  public usersList = users; 
  constructor(private utilsService: UtilsService, private router:Router){}

  ngOnInit(): void {
    console.log(users);
  }

  userDetails(userData:any){
    this.utilsService.setSelectedUser(userData);
    this.router.navigate(['user']);
  }
}
