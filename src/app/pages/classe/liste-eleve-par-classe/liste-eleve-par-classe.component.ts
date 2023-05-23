import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/layouts/service/classe.service';

import { EleveService } from 'src/app/layouts/service/eleve.service';
import { Inscription } from 'src/app/layouts/service/general.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-liste-eleve-par-classe',
  templateUrl: './liste-eleve-par-classe.component.html',
  styleUrls: ['./liste-eleve-par-classe.component.scss']
})
export class ListeEleveParClasseComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  term:any;
  eleves: any=[];
  classes: any=[];
  donneesClasses;
  mat='';
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

  };
  formInscription : FormGroup
  idinscriptions: any;
  donneeEleve;
  
  constructor(private modalService : NgbModal,private route: ActivatedRoute,private router : Router,  private fb : FormBuilder ,private serviceClasse : ClasseService , private serviceEleve : EleveService) {
    
   }

  ngOnInit(): void {
    let id: number;
    id = this.route.snapshot.params.id;
      this.serviceEleve.getAllEleveByClasse(id).subscribe(resp => {
          this.eleves = resp;
      }, error1 => {
      });
    this.serviceClasse.getAllClasse().subscribe(
        resp => {
            this.classes = resp;
        }, error1 => {
        });
    this.serviceClasse.getClasseById(id).subscribe(resp => {
      this.donneesClasses = resp;
      console.log(resp)
  }, error1 => {
  });
  }

  ModalUpdateEleve(matricule, centerModal?: any) {
    this.serviceEleve.getEleveByMatricule(matricule).subscribe(value => {
      console.log(value)
      this.donneeEleve = value;
      this.inscription.id = this.donneeEleve[0].id,
      this.inscription.nom = this.donneeEleve[0].nom,
       this.inscription.prenom = this.donneeEleve[0].prenom,
       this.inscription.classeId = this.route.snapshot.params.id,
       this.inscription.email = this.donneeEleve[0].email,
       this.inscription.adresse = this.donneeEleve[0].adresse,
       this.inscription.dateNaissance = this.donneeEleve[0].dateNaissance,
       this.inscription.nomParent = this.donneeEleve[0].nom_parent,
       this.inscription.prenomParent = this.donneeEleve[0].prenom_parent,
       this.inscription.sexe = this.donneeEleve[0].sexe,
       this.inscription.telephone = this.donneeEleve[0].telephone,
       this.inscription.telephoneParent = this.donneeEleve[0].telephone_parent;
       },error1 => {
       })
       console.log(this.inscription)
    this.modalService.open(centerModal, {size: 'xl', centered: true });
  }

  updateinscriptions() {
    
    console.log( this.inscription)
    this.serviceEleve.updatdeEleve(this.inscription).subscribe(
        result => {
          console.log(result)
          if (result['success']) {
            let id: number;
            this.modalService.dismissAll();
            this.serviceEleve.getAllEleveByClasse(id).subscribe(
              (result) => {
                this.eleves = result;
              },
              err => {
                console.log(err)
              }
            );
            this.serviceClasse.getClasseById(id).subscribe(resp => {
              this.donneesClasses = resp;
              console.log(resp)
          }, error1 => {
          })
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Informations élève modifiées avec succès',
              showConfirmButton: false,
              timer: 1500
            });
            this.formInscription.reset();
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'La modification a échoué!'
            });
            
          }
        },
      );
    }
    currentPage = 1;
     pageSize = 8;

  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.eleves.length);
  }

    goDetailsEleve(matricule: any) {

      this.router.navigate(['/pages/classe/detailsEleve', matricule]);
    
    }

    
}
