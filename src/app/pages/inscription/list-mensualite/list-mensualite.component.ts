import { Component, OnInit } from '@angular/core';
import {Contenue, ContenuePaiement, Note} from "../../../layouts/service/general.model";
import {FormBuilder} from "@angular/forms";
import {ClasseService} from "../../../layouts/service/classe.service";
import {EleveService} from "../../../layouts/service/eleve.service";
import {NoteService} from "../../../layouts/service/note.service";
import { MensualiteList } from './list-mensualite.model';

@Component({
  selector: 'app-list-mensualite',
  templateUrl: './list-mensualite.component.html',
  styleUrls: ['./list-mensualite.component.scss']
})
export class ListMensualiteComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  transactions;
  term: any;

  note: Note[] = [];
  trouve: boolean = false;
  eleves: any = [];
  classes;
  test: string = '0';
  matieres;
  rateControl: any;

  currentPage: number = 1;
  pageSize: number = 10;
  filteredMensualite: any[] = [];
  pagedMensualite: MensualiteList[] = []; // Ajoutez cette propriété
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedMensualite : string = '';
  selectedStatus: string = "Tous";

  contenue: ContenuePaiement = {
    idClasse: '',
   idMois: ''
  };

  tabMois: { id: number, mois: string }[] = [
    { id: 1, mois: 'Janvier' },
    { id: 2, mois: 'Février' },
    { id: 3, mois: 'Mars' },
    { id: 4, mois: 'Avril' },
    { id: 5, mois: 'Mai' },
    { id: 6, mois: 'Juin' },
    { id: 7, mois: 'Juillet' },
    { id: 8, mois: 'Août' },
    { id: 9, mois: 'Septembre' },
    { id: 10, mois: 'Octobre' },
    { id: 11, mois: 'Novembre' },
    { id: 12, mois: 'Décembre' }
  ];
  constructor(private fb : FormBuilder ,private serviceClasse: ClasseService, private serviceEleve: EleveService, private serviveNote: NoteService) {


  }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Saas', active: true }];


    this.serviceClasse.getAllClasseAvecInscris().subscribe(resp => {
      this.classes = resp;
    }, error1 => {
    });


    this.serviceClasse.getAllMatiere().subscribe(resp => {
      this.matieres = resp;
    }, error1 => {
    });


  }

  formatMontant(montant: number): string {
  // Vérifiez d'abord si montant est défini et n'est pas null
  if (montant !== null && montant !== undefined) {
    // Utilisez la méthode toLocaleString avec l'option 'fr-FR' pour formater le montant avec un espace comme séparateur des milliers.
    return montant.toLocaleString('fr-FR');
  } else {
    // Gérez le cas où montant est null ou non défini, par exemple, en renvoyant une chaîne vide.
    return '';
  }
}

  recuperation($event: Event) {
    this.test = this.contenue.idClasse;
    this.serviceEleve.getElevePayerByClasseByMois(this.contenue.idClasse,this.contenue.idMois).subscribe(
      (result: MensualiteList[]) => {
        this.filteredMensualite = this.eleves =  result; // Initialize both arrays
        console.log(this.eleves)
        this.filterMensualite();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  recuperationClasse($event: Event) {
    this.contenue.idMois = ''
  }

  filterMensualite() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
  
    this.pagedMensualite = this.filteredMensualite
      .slice(startIndex, endIndex)
      .sort((a, b) => {
        if (this.sortDirection === 'asc') {
          return a.nom.localeCompare(b.nom);
        } else {
          return b.nom.localeCompare(a.nom);
        }
      });
  }
  

  changeItemsPerPage() {
    this.filterMensualite();
  }

  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1; // Réinitialiser la page courante à 1
    this.filterMensualite();
  }

  SearchFilter(e) {
    const searchStr = e.target.value.trim().toLowerCase();
    if (searchStr.length === 0) {
      this.filteredMensualite = this.eleves;
    } else {
      this.filteredMensualite = this.eleves.filter((eleve) => {
        const fullName = `${eleve.nom} ${eleve.prenom}`.toLowerCase();
        return fullName.includes(searchStr);
      });
    }
    this.filterMensualite();
  }
  


  pageChanged(page: number) {
    this.currentPage = page;
    this.filterMensualite();
  }

  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filterMensualite();
  }

  imprimerMensualite() {
    const printContents = document.getElementById('table-container').innerHTML; // Obtenez le contenu HTML de la table
    const originalContents = document.body.innerHTML; // Obtenez le contenu HTML de la page

    // Créez une balise title pour définir le titre de la page d'impression
    const pageTitle = "<title>Liste de toutes les élèves</title>";

    // Remplacez le contenu actuel de la page par le contenu de la table avec la balise title
    document.body.innerHTML = pageTitle + printContents;

    // Appelez la fonction window.print() pour imprimer la table
    window.print();

    // Restaurez le contenu original de la page
    document.body.innerHTML = originalContents;
}

filterByStatus(status: string) {
  if (status === "Tous") {
      this.filteredMensualite = this.eleves;
  } else {
      this.filteredMensualite = this.eleves.filter(eleve => eleve.status_payement == status);
 
    }
    this.filterMensualite();
  this.currentPage = 1;
}

}
