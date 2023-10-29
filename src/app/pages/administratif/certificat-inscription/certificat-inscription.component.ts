import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Contenue, Note} from "../../../layouts/service/general.model";
import {FormBuilder} from "@angular/forms";
import {ClasseService} from "../../../layouts/service/classe.service";
import {EleveService} from "../../../layouts/service/eleve.service";
import {NoteService} from "../../../layouts/service/note.service";
import Swal from "sweetalert2";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-certificat-inscription',
  templateUrl: './certificat-inscription.component.html',
  styleUrls: ['./certificat-inscription.component.scss']
})
export class CertificatInscriptionComponent implements OnInit {

  @ViewChild('certificateContent', { static: false }) certificateContent: ElementRef;

// bread crumb items
breadCrumbItems: Array<{}>;
transactions;
term: any;

//note: Note[] = [];
trouve: boolean = false;
eleves: any = [];
eleveImprimercertificat: any = [];
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
anneesScolaires: string[] = ['2022/2023', '2023/2024', '2024/2025']; // Remplacez ces valeurs par vos années scolaires réelles

constructor(private fb : FormBuilder, private route: Router,private serviceClasse: ClasseService, private serviceEleve: EleveService,private modalService: NgbModal) {


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


  centerModal(centerDataModal: any,eleve: any) {
    this.modalService.open(centerDataModal, { centered: true });
    this.eleveImprimercertificat = eleve;
    console.log(eleve)
  }


  printCertificate() {
     const printContent = this.certificateContent.nativeElement.innerHTML;
     const originalContent = document.body.innerHTML;

     document.body.innerHTML = printContent;

    window.print();

  //  document.body.innerHTML = originalContent;
  }


}
