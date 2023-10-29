import { Component, OnInit } from '@angular/core';
import {Contenue, Note} from "../../../layouts/service/general.model";
import {FormBuilder} from "@angular/forms";
import {ClasseService} from "../../../layouts/service/classe.service";
import {EleveService} from "../../../layouts/service/eleve.service";
import {NoteService} from "../../../layouts/service/note.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import { Mensualite } from './mensualite.model';

@Component({
  selector: 'app-mensualite',
  templateUrl: './mensualite.component.html',
  styleUrls: ['./mensualite.component.scss']
})
export class MensualiteComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  transactions;
  term: any;

  note: Note[] = [];
  trouve: boolean = false;
  eleves: Mensualite[] = [];
  classes;
  test: string = '0';

  rateControl: any;

  currentPage: number = 1;
  pageSize: number = 10;
  filteredMensualite: any[] = [];
  pagedMensualite: Mensualite[] = []; // Ajoutez cette propriété
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedMensualite : string = '';

  contenue: Contenue = {
    idClasse: '',
    idEleve: '',
    idMatiere: '',
    noteEleve: '',
  };
  constructor(private fb : FormBuilder, private route: Router,private serviceClasse: ClasseService, private serviceEleve: EleveService, private serviveNote: NoteService) {


  }

  ngOnInit(): void {


    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Saas', active: true }];


    this.serviceClasse.getAllClasseAvecInscris().subscribe(resp => {
      this.classes = resp;
    }, error1 => {
    });

  }

  recuperation($event: Event) {
    this.test = this.contenue.idClasse;
    this.serviceEleve.getAllEleveByClasse(this.test).subscribe(
      (result: Mensualite[]) => {
        this.filteredMensualite = this.eleves =  result; // Initialize both arrays
        this.filterMensualite();
      },
      (err) => {
        console.log(err);
      }
    );

  }


  suiviPaiement(matricule) {
    this.route.navigate(['/pages/inscription/suivipaiement', matricule]);
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
  
}
