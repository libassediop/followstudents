import { Component, OnInit } from '@angular/core';
import {Contenue, ContenuePaiement, Note} from "../../../layouts/service/general.model";
import {FormBuilder} from "@angular/forms";
import {ClasseService} from "../../../layouts/service/classe.service";
import {EleveService} from "../../../layouts/service/eleve.service";
import {NoteService} from "../../../layouts/service/note.service";
import Swal from "sweetalert2";

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

  recuperation($event: Event) {
    this.test = this.contenue.idClasse;

    this.serviceEleve.getElevePayerByClasseByMois(this.contenue.idClasse,this.contenue.idMois).subscribe(resp => {
      this.eleves = resp;
      console.log(resp);

    }, error1 => {
    });

  }



}
