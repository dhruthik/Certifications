import { Component, OnInit } from '@angular/core';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [StepsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit{
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
    constructor(){}

    ngOnInit(): void {
      
    }

    onActiveIndexChange(e:number){
      this.activeIndex = e;
    }
}
