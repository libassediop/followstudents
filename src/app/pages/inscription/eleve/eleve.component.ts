import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss']
})
export class EleveComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  dateDeNaissance: string;

  tuteurValidationForm: FormGroup; // tuteur validation form
  tuteursubmit: boolean;

  eleveValidationForm: FormGroup; // eleve validation form
  elevesubmit: boolean;



  constructor(public formBuilder: FormBuilder) {
    // Initialisez la variable avec la date d'aujourd'hui
    this.dateDeNaissance = this.formatDate(new Date());
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Forms' }, { label: 'Form Validation', active: true }];

     /**
     * Tuteur validation form
     */
     this.tuteurValidationForm = this.formBuilder.group({
      telephone: ['', [Validators.required, Validators.pattern('[0-9]+')]],
      nom: ['', [Validators.required]],
      prenom:['', [Validators.required]],
    });

      /**
     * Eleve validation form
     */
      this.eleveValidationForm = this.formBuilder.group({
        nom: ['', [Validators.required]],
        prenom:['', [Validators.required]],
        sexe: ['', [Validators.required]],
        adresse: ['', [Validators.required]],
        classe: ['', [Validators.required]],
      });
  }

  /**
   * Tuteur validation form submit data
   */
  tuteurSubmit() {
    this.tuteursubmit = true;
  }

   /**
   * Returns the Tuteur validation form
   */
   get tuteur() {
    return this.tuteurValidationForm.controls;
  }

    /**
   * Eleve validation form submit data
   */
    eleveSubmit() {
      this.elevesubmit = true;
    }
  
     /**
     * Returns the eleve validation form
     */
     get eleve() {
      return this.eleveValidationForm.controls;
    }
  

   // Fonction pour formater la date au format "YYYY-MM-DD"
   private formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
