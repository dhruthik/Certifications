import { Component, OnInit } from '@angular/core';
import { } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
 public tabIdx:number = 0;
 constructor(){}
 
 ngOnInit(): void {
  const storedTabId = window.localStorage.getItem("tabId");
  this.tabIdx = storedTabId ? JSON.parse(storedTabId) : 0;
 }

 onTabSelect(tabIdx:number){
    this.tabIdx = tabIdx;
    window.localStorage.setItem("tabId",JSON.stringify(tabIdx));
 }
}
