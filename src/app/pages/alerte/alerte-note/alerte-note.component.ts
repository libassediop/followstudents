import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { ClasseService } from 'src/app/layouts/service/classe.service';
import { EleveService } from 'src/app/layouts/service/eleve.service';
import { Contenue, Note } from 'src/app/layouts/service/general.model';
import { NoteService } from 'src/app/layouts/service/note.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alerte-note',
  templateUrl: './alerte-note.component.html',
  styleUrls: ['./alerte-note.component.scss']
})
export class AlerteNoteComponent implements OnInit {

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
    this.note=[];
    this.serviceClasse.getMatiereByClasse(this.test).subscribe(resp => {
        this.matieres = resp;
    }, error1 => {
    });
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


}
