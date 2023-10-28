import { Component, OnInit } from '@angular/core';
import {Contenue, Note} from "../../../layouts/service/general.model";
import {FormBuilder} from "@angular/forms";
import {ClasseService} from "../../../layouts/service/classe.service";
import {EleveService} from "../../../layouts/service/eleve.service";
import {NoteService} from "../../../layouts/service/note.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-certificat-absence',
  templateUrl: './certificat-absence.component.html',
  styleUrls: ['./certificat-absence.component.scss']
})
export class CertificatAbsenceComponent implements OnInit {
// bread crumb items
breadCrumbItems: Array<{}>;
transactions;
term: any;

//note: Note[] = [];
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
constructor(private fb : FormBuilder, private route: Router,private serviceClasse: ClasseService, private serviceEleve: EleveService) {


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
  }, error1 => {
  });

}





suiviPaiement(matricule) {
  this.route.navigate(['/pages/inscription/suivipaiement', matricule]);
}
}
