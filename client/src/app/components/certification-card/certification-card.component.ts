import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-certification-card',
  standalone: true,
  imports: [StepsModule, CommonModule],
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
@Input() certData:any = []
  constructor(){}

  ngOnInit(): void {

    console.log('incard : ',this.certData)
    this.activeIndex = this.certData.status;
  }

  onActiveIndexChange(e:number){
    this.activeIndex = e;
  }
}
