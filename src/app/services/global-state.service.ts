import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, forkJoin, of } from 'rxjs';
import { CertificationsService } from './certifications.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalStateService {

  private _selectedCertificationDetails$A: any = {};
  private _showDialogFlagInAddCert: boolean = false;
  private _showNavigationFlag: boolean = false;
  public _certificationsList:any = {};
  private _filteredByCert: string = '';
  private _isAdmin: boolean = true;
  
  private _selectedEmployeeDetails$A = new BehaviorSubject<{}>({});
  currentSelectedEmployeeDetails$A = this._selectedEmployeeDetails$A.asObservable();

  private _userForm: FormGroup = this.fb.group({
    selectedData: [''],
    selectedStack: [""],
    selectedCertification: [""],
    selectedCategory: ['Employee']
  });

  constructor(private fb: FormBuilder, private certService: CertificationsService) { }

  get selectedCertificationDetails$A(): any {
    return this._selectedCertificationDetails$A;
  }

  set selectedCertificationDetails$A(value: any) {
    this._selectedCertificationDetails$A = value;
  }

  get showDialogFlagInAddCert(): boolean {
    return this._showDialogFlagInAddCert;
  }

  set showDialogFlagInAddCert(value: boolean) {
    this._showDialogFlagInAddCert = value;
  }

  get showNavigationFlag(): boolean {
    return this._showNavigationFlag;
  }

  set showNavigationFlag(value: boolean) {
    this._showNavigationFlag = value;
  }

  get userForm(): FormGroup {
    return this._userForm;
  }

  set userForm(value: FormGroup) {
    this._userForm = value;
  }

  get certificationsList(): any {
    return this._certificationsList;
  }

  set certificationsList(value: any) {
    this._certificationsList = value;
  }

  get filteredByCert(): string {
    return this._filteredByCert;
  }

  set filteredByCert(value: string) {
    this._filteredByCert = value;
  }

  get isAdmin(): boolean {
    return this._isAdmin;
  }
  set isAdmin(value: boolean) {
    this._isAdmin = value;
  }


  getSelectedEmployeeDetails$A(empData: any) {
    this._selectedEmployeeDetails$A.next(empData);
  }


  handleCertificationsApi() {
    const salesforceExists = !!this._certificationsList['salesforce'];
    const javaExists = !!this._certificationsList['java'];
    const awsExists = !!this._certificationsList['aws'];
  
    const salesforce$ = salesforceExists ? of(this._certificationsList['salesforce']) : this.certService.getCertifications('salesforce');
    const java$ = javaExists ? of(this._certificationsList['java']) : this.certService.getCertifications('java');
    const aws$ = awsExists ? of(this._certificationsList['aws']) : this.certService.getCertifications('aws');
  
    forkJoin([salesforce$, java$, aws$]).subscribe({
      next: ([salesforceRes, javaRes, awsRes]) => {
        if (!salesforceExists) {
          this._certificationsList['salesforce'] = salesforceRes;
        }
  
        if (!javaExists) {
          this._certificationsList['java'] = javaRes;
        }
  
        if (!awsExists) {
          this._certificationsList['aws'] = awsRes;
        }
  
        console.log('cert services:', this._certificationsList);
      },
      complete:()=>{
        console.log("certifications fetched !")
      },
      error: (error) => {
        console.error('Error fetching certifications:', error);
      }
    });
  }

}
