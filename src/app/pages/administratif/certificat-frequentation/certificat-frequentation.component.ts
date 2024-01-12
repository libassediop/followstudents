import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Contenue} from "../../../layouts/service/general.model";
import {Router} from "@angular/router";
import {ClasseService} from "../../../layouts/service/classe.service";
import {EleveService} from "../../../layouts/service/eleve.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-certificat-frequentation',
  templateUrl: './certificat-frequentation.component.html',
  styleUrls: ['./certificat-frequentation.component.scss'],
  providers: [DatePipe]
})
export class CertificatFrequentationComponent implements OnInit {

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
  formEleve: FormGroup;

  contenue: Contenue = {
    idClasse: '',
    idEleve: '',
    idMatiere: '',
    noteEleve: '',
  };
  anneesScolaires: string[] = ['2022/2023']; // Remplacez ces valeurs par vos années scolaires réelles

  constructor(private datePipe: DatePipe, private fb : FormBuilder, private route: Router,private serviceClasse: ClasseService, private serviceEleve: EleveService,private modalService: NgbModal) {
    this.formEleve = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      lieuNaissance: ['', Validators.required],
      classe: ['', Validators.required],
      anneeScolaire: ['', Validators.required],
    });

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

  centerModalAsaisir(centerDataModal: any) {
    this.eleveImprimercertificat.nom = this.formEleve.value.nom;
    this.eleveImprimercertificat.prenom = this.formEleve.value.prenom;
    this.eleveImprimercertificat.dateNaissance = this.formEleve.value.dateNaissance;
    this.eleveImprimercertificat.classe = this.formEleve.value.classe;
    this.eleveImprimercertificat.anneeScolaire = this.formEleve.value.anneeScolaire;



    this.modalService.open(centerDataModal, { centered: true });

    //this.eleveImprimercertificat = eleve;

  }

  extraLarge(exlargeModal: any) {
    this.modalService.open(exlargeModal, { size: 'l', centered: true });
  }

  genererCertificat(){

  }

  printCertificate() {
    const printContent = this.certificateContent.nativeElement.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;

    window.print();

    //  document.body.innerHTML = originalContent;
  }

  getDate(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'dd/MM/yyyy') || '';
  }

}
