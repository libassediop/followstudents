import { Component, OnInit } from '@angular/core';
import {Contenue, Note} from "../../../layouts/service/general.model";
import {FormBuilder} from "@angular/forms";
import {ClasseService} from "../../../layouts/service/classe.service";
import {EleveService} from "../../../layouts/service/eleve.service";
import {NoteService} from "../../../layouts/service/note.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";

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
  eleves: any = [];
  classes;
  test: string = '0';
  matieres;
  rateControl: any;

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
    this.serviceClasse.getAllMatiere().subscribe(resp => {
      this.matieres = resp;
    }, error1 => {
    });


  }

  recuperation($event: Event) {
    this.test = this.contenue.idClasse;
    this.serviceEleve.getAllEleveByClasse(this.test).subscribe(resp => {
      this.eleves = resp;
      for (let i = 0; i < this.eleves.length; i++) {
        this.note.push({idEleve: this.eleves[i].id, noteEleve: '0'})
      }
    }, error1 => {
    });

  }

  MiseAjourNoteEleve($event, id: any) {
    for (let i = 0; i < this.note.length; i++) {
      if (this.note[i].idEleve == id && $event.target.value != '') {
        this.note[i].noteEleve = $event.target.value;
      } else if (this.note[i].idEleve == id && $event.target.value == '') {
        this.note[i].noteEleve = '0';
      }
    }
  }

  addNote() {
    let trouve: number = 0;
    for (let i = 0; i < this.note.length; i++) {
      this.contenue.idEleve = this.note[i].idEleve,
        this.contenue.noteEleve = this.note[i].noteEleve
      this.serviveNote.AddNote(this.contenue).subscribe(result => {
        console.log (result)
        if (result['success'] == true) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'matiere ajouté avec succèss',
            showConfirmButton: false,
            timer: 1500
          });
          trouve = 1;
          this.matieres='';
        } else {
          trouve = 0;
        }

      }, error1 => {
        trouve = 0;
        console.log(error1);

      });

    }

  }

  suiviPaiement(matricule) {
    this.route.navigate(['/pages/inscription/suivipaiement', matricule]);
  }
}
