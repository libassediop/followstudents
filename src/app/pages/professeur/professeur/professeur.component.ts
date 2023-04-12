import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { userGridData } from 'src/app/services/data';
import { Usergrid } from 'src/modeles/usergrid.model';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.scss']
})
export class ProfesseurComponent implements OnInit {

  userGridData: Usergrid[];
  selected;
  userForm: FormGroup;
  submitted = false;
  items: FormArray;
  term:any;
  // Select2 Dropdown
  selectValue: string[];
  constructor(private modalService : NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.selectValue = ['Gerant  ,Distributeur'];

    
    this.userForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      designation: ['', [Validators.required]]
    });
    /**
     * fetches data
     */
    this._fetchData();
  }

  get form() {
    return this.userForm.controls;
  }

 /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */
 extraLarge(exlargeModal: any) {
  this.modalService.open(exlargeModal, { size: 'xl', centered: true });
}

  /**
   * User grid data fetches
   */
  private _fetchData() {
    this.userGridData = userGridData;
  }

  /**
   * Save user
   */
  saveUser() {
    if (this.userForm.valid) {
      const name = this.userForm.get('name').value;
      const email = this.userForm.get('email').value;
      const designation = this.userForm.get('designation').value;
       this.userGridData.push({
         id: this.userGridData.length + 1,
         name,
         email,
         designation,
         projects: this.selected
       })
       this.modalService.dismissAll()
    }
    this.submitted = true
  }


}
