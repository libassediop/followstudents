import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbNav } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/layouts/service/classe.service';
import { Inscription } from 'src/app/layouts/service/general.model';
import { InscriptionreinscriptionService } from 'src/app/layouts/service/inscriptionreinscription.service';
import { ProfesseurService } from 'src/app/layouts/service/professeur.service';
import Swal from 'sweetalert2';
import {Router} from "@angular/router";

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss']
})


export class EleveComponent implements OnInit {
  @ViewChild('nav') nav: NgbNav;
  active = 1;
 // typesubmit: boolean;
  breadCrumbItems: Array<{}>;
  trouveTel = false;
  inscription: Inscription = {
    id:'',
    nom: '',
    prenom: '',
    classeId: '',
    email: '',
    adresse: '',
    avance: 0,
    dateNaissance: '',
    emailParent: '',
    fonctionParent: '',
    lieuDeNaissance: '',
    montant: 0,
    nationalite: '',
    nomParent: '',
    prenomParent: '',
    sexe: '',
    sexeParent: '',
    telephone: '',
    telephoneParent: '',
    typeDePayement: 1,
    mensualite:0

};
classes : any = [];
formInscription: FormGroup;
val: string = '0';
navItem1: HTMLElement;
  navItem2: HTMLElement;
  btnSuivant: HTMLElement;


  constructor(private route:Router,private professeurService : ProfesseurService,   private fb : FormBuilder, private classeService: ClasseService, private serviceInscription: InscriptionreinscriptionService) {

   }

  ngOnInit(): void {
    this.formInscription = this.fb.group({
      // Ajoutez ici les contrôles de vot
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      sexe: ['', Validators.required],
      dateNaissance: ['', Validators.required],
      adresse: ['', Validators.required],
      classeId: ['', Validators.required],
      nomParent: ['', Validators.required],
      prenomParent: ['', Validators.required],
      telephoneParent: ['', Validators.required],
      montant: ['', Validators.required],
      avance: ['', Validators.required],
      emailParent: ['', Validators.required],
      mensualite: ['', Validators.required],

    })
    this.classeService.getAllClasse().subscribe(
      resp => {
          this.classes = resp;
      }, error1 => {
          console.log(error1)
      });


  }

  onNavChange(event: any) {
    this.active = 2;
  }

  onNavChangePre(event: any) {
    this.active = 1;
  }



  addInscription() {
    // console.log(this.matiere);
    this.inscription.nom = this.formInscription.value.nom;
    this.inscription.prenom = this.formInscription.value.prenom;
    this.inscription.sexe = this.formInscription.value.sexe;
    this.inscription.dateNaissance = this.formInscription.value.dateNaissance;
    this.inscription.adresse = this.formInscription.value.adresse;
    this.inscription.classeId = this.formInscription.value.classeId;
    this.inscription.nomParent = this.formInscription.value.nomParent;
    this.inscription.prenomParent = this.formInscription.value.prenomParent;
    this.inscription.emailParent = this.formInscription.value.emailParent;
    this.inscription.telephoneParent = this.formInscription.value.telephoneParent;
    this.inscription.montant = this.formInscription.value.montant;
    this.inscription.avance = this.formInscription.value.avance;
    this.inscription.mensualite = this.formInscription.value.mensualite;
    this.serviceInscription.addInscription(this.inscription).subscribe(
      result => {
        console.log(result);
        if (result['success']) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'inscription ajoutée avec succèss',
            showConfirmButton: false,
            timer: 1500
          });
          this.formInscription.reset();
          this.route.navigate(['/pages/inscription/listInscription']);
        }
        this.inscription = {
          id:'',
          nom: '',
          prenom: '',
          classeId: '',
          email: '',
          adresse: '',
          avance: 0,
          dateNaissance: '',
          emailParent: '',
          fonctionParent: '',
          lieuDeNaissance: '',
          montant: 0,
          mensualite: 0,
          nationalite: '',
          nomParent: '',
          prenomParent: '',
          sexe: '',
          sexeParent: '',
          telephone: '',
          telephoneParent: '',
          typeDePayement: 1,
        };


      },
      error => {
        console.log(error)
      }
    )
  }

  testTelephone($event: any) {
    // console.log(this.personnel.telephone)
    this.professeurService.verifieTel(this.formInscription.value.telephone).subscribe(value => {
        if (value['succes'] == true) {
            this.trouveTel = true;
        } else {
            this.trouveTel = false;
        }
    }, error1 => {
      console.log(error1)
    })
  }


  onvalideEleve() {
    if (this.formInscription.value.nom =="" || this.formInscription.value.prenom =="" || this.formInscription.value.sexe =="" || this.formInscription.value.dateNaissance=='' || this.formInscription.value.classeId=="" ||this.formInscription.value.montant==''|| this.formInscription.value.avance =='' ||this.formInscription.value.mensualite=='')
      return true
    else
      return false;
  }

  onvalidateInscription() {
    if (this.formInscription.value.nomParent =="" || this.formInscription.value.prenomParent =="" || this.formInscription.value.telephoneParent =="" )
      return true
    else
      return false;
  }
}
