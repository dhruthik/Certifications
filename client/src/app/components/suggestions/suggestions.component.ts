import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-suggestions',
  standalone: true,
  imports: [ButtonModule, TableModule, CommonModule],
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.scss'
})
export class SuggestionsComponent implements OnInit{
  public certificates:any = [
    {
      "id": 1,
      "certificationName": "Associate",
      "cost": "$75",
      "type": "Associates",
      "level": "Entry-level",
      "experience": "0-6 months",
      "prerequisite": "None"
    },
    {
      "id": 2,
      "certificationName": "AI Associate",
      "cost": "$75",
      "type": "Associates",
      "level": "Entry-level",
      "experience": "1-2 years",
      "prerequisite": "None"
    },
    {
      "id": 3,
      "certificationName": "Administrator",
      "cost": "$200",
      "type": "Admins",
      "level": "Mid-level",
      "experience": "1-2 years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 4,
      "certificationName": "Advanced Administrator",
      "cost": "$200",
      "type": "Admins",
      "level": "Mid-level",
      "experience": "1-2 years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 5,
      "certificationName": "Platform App Builder",
      "cost": "$200",
      "type": "Admins",
      "level": "Mid-level",
      "experience": "1-2 years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 6,
      "certificationName": "CPQ Specialist",
      "cost": "$200",
      "type": "Admins",
      "level": "Mid-level",
      "experience": "6-12 months",
      "prerequisite": "None"
    },
    {
      "id": 7,
      "certificationName": "Business Analyst",
      "cost": "$200",
      "type": "Admins",
      "level": "Mid-level",
      "experience": "2 years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 8,
      "certificationName": "User experience (UX) Designer",
      "cost": "$200",
      "type": "Designers",
      "level": "Mid-level",
      "experience": "1-2 years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 9,
      "certificationName": "Strategy Designer",
      "cost": "$200",
      "type": "Designers",
      "level": "Mid-level",
      "experience": "1-2 years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 10,
      "certificationName": "Service Cloud Consultant",
      "cost": "$200",
      "type": "Consultants",
      "level": "Mid-level",
      "experience": "2-5 years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 11,
      "certificationName": "Data Cloud Consultant",
      "cost": "$200",
      "type": "Consultants",
      "level": "Mid-level",
      "experience": "2 years",
      "prerequisite": "None"
    },
    {
      "id": 12,
      "certificationName": "Sales Cloud Consultant",
      "cost": "$200",
      "type": "Consultants",
      "level": "Mid-level",
      "experience": "2+ years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 13,
      "certificationName": "Field Service Consultant",
      "cost": "$200",
      "type": "Consultants",
      "level": "Mid-level",
      "experience": "2-5 years",
      "prerequisite": "Administrator and Service Cloud Consultant credentials"
    },
    {
      "id": 14,
      "certificationName": "experience Cloud Consultant",
      "cost": "$200",
      "type": "Consultants",
      "level": "Mid-level",
      "experience": "2-5 years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 15,
      "certificationName": "Tableau CRM and Einstein Discovery Consultant",
      "cost": "$200",
      "type": "Consultants",
      "level": "Mid-level",
      "experience": "1+ years",
      "prerequisite": "None"
    },
    {
      "id": 16,
      "certificationName": "Nonprofit Cloud Consultant",
      "cost": "$200",
      "type": "Consultants",
      "level": "Mid-level",
      "experience": "3 years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 17,
      "certificationName": "Education Cloud Consultant",
      "cost": "$200",
      "type": "Consultants",
      "level": "Mid-level",
      "experience": "3+ years",
      "prerequisite": "Administrator credential"
    },
    {
      "id": 18,
      "certificationName": "OmniStudio Consultant",
      "cost": "$200",
      "type": "Consultants",
      "level": "Mid-level",
      "experience": "3+ years",
      "prerequisite": "None"
    },
    {
      "id": 19,
      "certificationName": "Identity and Access Management Architect",
      "cost": "$400",
      "type": "Architects",
      "level": "Senior-level",
      "experience": "1+ years",
      "prerequisite":"None"
    }
  ]  
  constructor(){}

  ngOnInit(): void {
    
  }
}
