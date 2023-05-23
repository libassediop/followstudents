import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { ClasseService } from 'src/app/layouts/service/classe.service';
import { EleveService } from 'src/app/layouts/service/eleve.service';
import { AddAbsence } from 'src/app/layouts/service/general.model';
import { NoteService } from 'src/app/layouts/service/note.service';
import Swal from 'sweetalert2';

declare interface TableData {
  headerRow: string[];

}
declare var $: any;

@Component({
  selector: 'app-alerte-absence',
  templateUrl: './alerte-absence.component.html',
  styleUrls: ['./alerte-absence.component.scss']
})
export class AlerteAbsenceComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  public tableData1: TableData;
  transactions;
  term: any;
  classes;
    matiere;
    listeEleveByClasse;
    test;
    trouve='';
    Tab: any = []
    TabNormal: any = []
    LastTab: any = []
    TabDateFin: any = []
    TabDateF: any = []
    absence: AddAbsence = {
        idClasse: '',
        date_debut: '',
        date_fin: '',
        matiere_id: '',
        user_ida: localStorage.getItem('id')
    }
  constructor(public serviceNote: NoteService, public serviceClasse: ClasseService, public serviceEleve: EleveService, public router: Router) { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Saas', active: true }];

          this.serviceClasse.getAllClasseAvecInscris().subscribe(resp => {
            this.classes = resp;
        }, error1 => {
        });
      //   this.serviceClasse.getAllMatiere().subscribe(resp => {
      //     this.matiere = resp;
      // }, error1 => {
      // });

  }


  recuperations($event: Event) {
    this.test = this.absence.idClasse;
    this.Tab=[];
    this.serviceClasse.getMatiereByClasse(this.test).subscribe(
        resp => {
            this.matiere = resp;
            console.log(resp)
        }, error1 => {
        });

    this.serviceEleve.getAllEleveByClasse(this.test).subscribe(
        resp => {
            this.listeEleveByClasse = resp;
            console.log(resp)
        }, error1 => {
        });
    this.tableData1 = {
        headerRow: ['Nom', 'Prenom', 'Date de Naissance', 'Action'],

    };
}

recuperationDateDebut($event: Event) {
    this.TabDateFin = this.parCourirDateDebut(this.absence.date_debut, this.TabDateF);
    console.log(this.TabDateFin)
}

parCourirDateDebut(id, Tab) {
    Tab = [];
    for (let i = id; i <= 18; i++) {
        let k = parseInt(i);
        Tab.push(k + 1);
    }
    return Tab;
}

addAbsence(form: NgForm) {
    //Récupération des IdEleve checked
    for (let i = 0; i < this.Tab.length; i++) {
        let cpt = 0;
        for (let j = 0; j < this.Tab.length; j++) {
            if (this.Tab[i] == this.Tab[j]) {
                cpt += 1;
            }
        }
        if (cpt % 2 != 0) {
           // console.log(this.Tab[i]);
            this.TabNormal.push(this.Tab[i]);
        }

    }
    // Suppression des doublons
    this.LastTab = this.supprimerDoublon(this.TabNormal)
    for (let i = 0; i < this.LastTab.length; i++) {
 //       console.log(this.LastTab[i]);
        this.serviceNote.addAbsenceYole(this.absence, this.LastTab[i]).subscribe(result => {   
          console.log(result)             
            if (result['success'] == true) {
              
              Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'matiere ajouté avec success',
                showConfirmButton: false,
                timer: 1500
              });
                
                this.matiere='';
            } 
            else{
              
                
            }
        }, error => {
     });
    }

}

supprimerDoublon(TabIdEleve) {
  let unique = {};
  TabIdEleve.forEach(function (i) {
      if (!unique[i]) {
          unique[i] = true;
      }
  });
  return Object.keys(unique);
}

 focusoutHandler(event: any) {
  this.Tab.push(event.currentTarget.value);
}


currentPage = 1;
pageSize = 7;

get startIndex() {
  return (this.currentPage - 1) * this.pageSize;
}

get endIndex() {
  return Math.min(this.startIndex + this.pageSize, this.listeEleveByClasse.length);
}
}
