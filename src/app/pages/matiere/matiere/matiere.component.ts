import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/layouts/service/classe.service';
import { Matiere } from 'src/app/layouts/service/general.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matiere',
  templateUrl: './matiere.component.html',
  styleUrls: ['./matiere.component.scss'],
})
export class MatiereComponent implements OnInit {
  term: any;
  formM: FormGroup;
  update: any;
  idMatiere;
  matieres: Matiere[] = [];
  filteredMatieres: Matiere[] = [];
  selectedMatiere: string = '';
  currentPage: number = 1;
  pageSize: number = 10;
  sortDirection: 'asc' | 'desc' = 'asc';
  pagedMatieres: Matiere[] = []; // Ajoutez cette propriété
  impressionMatiere : Matiere[] = []; 

  constructor(
    private serviceMatiere: ClasseService,
    public fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.formM = this.fb.group({
      libelle: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllMatieres();
  }

  getAllMatieres() {
    this.serviceMatiere.getAllMatiere().subscribe(
      (result: Matiere[]) => {
        this.filteredMatieres = this.matieres = result; // Initialize both arrays
        this.filterMatieres();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  AddMatiere() {
    const newMatiere: Matiere = {
      libelle: this.formM.value.libelle,
    };

    this.serviceMatiere.addMatiere(newMatiere).subscribe(
      (result) => {
        this.modalService.dismissAll();
        console.log(result)
        if (result['sucsess']) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Matière ajoutée avec succès',
            showConfirmButton: false,
            timer: 1500,
          });

          this.resetFormAndReloadMatieres();
        } else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'La matière que vous souhaitez ajouter existe déjà',
            showConfirmButton: false,
            timer: 2000,
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  UpdateMatiere(idM) {
    this.update = true;
    this.serviceMatiere.getMatiereById(idM).subscribe(
      (value) => {
        this.formM.setValue({
          libelle: value[0].libelle,
        });
        this.idMatiere = idM;
      },
      (error1) => {
        console.log(error1);
      }
    );
    this.formM.reset();
  }

  ModifierMatiere() {
    const updatedMatiere: Matiere = {
      libelle: this.formM.value.libelle,
    };

    this.serviceMatiere
      .modifierMatiere(this.idMatiere, updatedMatiere)
      .subscribe(
        (result) => {
          if (result['success']) {
            this.modalService.dismissAll();
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Matière modifiée avec succès',
              showConfirmButton: false,
              timer: 1500,
            });
            this.resetFormAndReloadMatieres();
            this.update=false
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Une erreur est survenue lors de la modification de la matière.',
            });
          }
        }
      );
  }

  Annuler() {
    this.update = false;
    this.formM.reset();
  }

  resetFormAndReloadMatieres() {
    this.formM.reset();
    this.getAllMatieres();
  }

  SearchFilter(e) {
    const searchStr = e.target.value.trim().toLowerCase();
    if (searchStr.length === 0) {
      this.filteredMatieres = this.matieres;
    } else {
      this.filteredMatieres = this.matieres.filter((matiere) => {
        return matiere.libelle.toLowerCase().includes(searchStr);
      });
    }
    this.filterMatieres();
  }

  print() {
    window.print();
  }

  DeleteMatiere(id: string) {
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: 'Vous ne pourrez pas revenir en arrière !',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, continuer!',
    }).then((result) => {
      if (result.value) {
        this.serviceMatiere.supprimerMatiereById(id).subscribe((value) => {
          if (value['success']) {
            Swal.fire('Suppression!', 'La matière a été supprimée avec succès.', 'success');
            this.resetFormAndReloadMatieres();
          } else {
            Swal.fire('Erreur!', "La matière ne peut pas être supprimée.", 'error');
          }
        });
      }
    });
  }

  filterMatieres() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  
    this.pagedMatieres = this.filteredMatieres
      .slice(startIndex, endIndex)
      .sort((a, b) => {
        if (this.sortDirection === 'asc') {
          return a.libelle.localeCompare(b.libelle);
        } else {
          return b.libelle.localeCompare(a.libelle);
        }
      });
  }
  

  changeItemsPerPage() {
    this.filterMatieres();
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1; // Réinitialiser la page courante à 1
    this.filterMatieres();
  }

  pageChanged(page: number) {
    this.currentPage = page;
    this.filterMatieres();
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filterMatieres();
  }
  

  imprimerMatieres() {
    const printContents = document.getElementById('table-container').innerHTML; // Obtenez le contenu HTML de la table
    const originalContents = document.body.innerHTML; // Obtenez le contenu HTML de la page

    // Créez une balise title pour définir le titre de la page d'impression
    const pageTitle = "<title>Liste de toutes les matières</title>";

    // Remplacez le contenu actuel de la page par le contenu de la table avec la balise title
    document.body.innerHTML = pageTitle + printContents;

    // Appelez la fonction window.print() pour imprimer la table
    window.print();

    // Restaurez le contenu original de la page
    document.body.innerHTML = originalContents;
}


}
