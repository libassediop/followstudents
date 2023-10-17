import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClasseService } from 'src/app/layouts/service/classe.service';
import { Classe, Matiere, Professeur } from 'src/app/layouts/service/general.model';
import { ProfesseurService } from 'src/app/layouts/service/professeur.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-professeur',
  templateUrl: './professeur.component.html',
  styleUrls: ['./professeur.component.scss']
})
export class ProfesseurComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  term:any;
  formprofesseur : FormGroup;
  trouveTel = false;
  trouveLogin = false;
  trouveEmail = false;
  modif;
  itemsPerPage = 12;
  totalItems: number;
  allItems: any = [];

  idprofesseur;
  public classes: any = [];
  classe: Classe = {
    libelle: '',
    niveau: '',
  };

  public matieres: any = [];
  matiere: Matiere = {
    libelle: ''
  }
  public professeurs: any = [] ;
  professeur: Professeur = {
    adresse: '',
    dateNaissance: '1999-03-31',
    email: '',
    lieuDeNaissance: 'null',
    nom: '',
    prenom: '',
    sexe: 'null',
    telephone: '',
    login: '',
    classeId:'',
    matiereId: ''
}
  constructor(private route: Router,private serviceClasse: ClasseService,private modalService : NgbModal, private professeurService: ProfesseurService,  public fb: FormBuilder) {
    this.formprofesseur = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      login: ['', Validators.required],
      adresse: ['', Validators.required],
      matiereId: ['', Validators.required],
      classeId: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.serviceClasse.getAllClasse().subscribe(
      resp => {
          this.classes= resp;
      }, error1 => {
      });
      this.serviceClasse.getAllMatiere().subscribe(
        resp => {
            this.matieres= resp;
        }, error1 => {
        });
    this.professeurService.getAllProfeeseur().subscribe(
      (result) => {
      // this.professeurs = result;
      this.allItems = result;
      this.totalItems = this.allItems.length;
      this.professeurs = this.allItems.slice(0, this.itemsPerPage);
      console.log(this.professeurs);
  }, error1 => {
      console.log(error1)
  });
  }

  loadMore() {
    const startIndex = this.professeurs.length;
    const endIndex = startIndex + this.itemsPerPage;
    this.professeurs = [...this.professeurs, ...this.allItems.slice(startIndex, endIndex)];
  }

  gotoClasseEnseigne(id: any) {
    this.route.navigate(['/pages/professeur/classeEnseigner', id]);
    console.log(this.route);
}


 /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */
 extraLarge(exlargeModal: any) {
  this.modalService.open(exlargeModal, { size: 'l', centered: true });

}

ModalUpdateprofesseur(login, centerModal?: any) {
  this.professeurService.getProfessurByLogin(login).subscribe(value => {
    console.log(value);
    this.formprofesseur.setValue({
      nom: value[0].nom,
      prenom: value[0].prenom,
      adresse: value[0].adresse,
      telephone: value[0].telephone,
      email: value[0].email,
      login: value[0].login,
      matiereId: 0,
      classeId: 0

      });
      console.log(this.formprofesseur);
     this.idprofesseur=value[0].id;
     },error1 => {
     })
  this.modalService.open(centerModal, {size: 'l', centered: true });
}

annuler(){

  this.formprofesseur.reset();
  this.professeur = {
    adresse: '',
    dateNaissance: '1999-03-31',
    email: '',
    lieuDeNaissance: null, // Utilisez null sans les guillemets pour représenter une valeur nulle
    nom: '',
    prenom: '',
    sexe: null,
    telephone: '',
    login: '',
    classeId: '',
    matiereId: ''
  };
}

updateprofesseur() {
  this.professeur.nom = this.formprofesseur.value.nom;
  this.professeur.prenom = this.formprofesseur.value.prenom;
  this.professeur.adresse = this.formprofesseur.value.adresse;
  this.professeur.telephone = this.formprofesseur.value.telephone;
  this.professeur.email = this.formprofesseur.value.telephone;
  this.professeur.login = this.formprofesseur.value.login;
  console.log(this.idprofesseur, this.professeur)
    this.professeurService.updateProfesseur(this.idprofesseur, this.professeur).subscribe(
      result => {
        if (result['success']) {
          this.modalService.dismissAll();
          this.professeurService.getAllSecretaire().subscribe(
            (result) => {
              this.professeurs = result;
            },
            err => {
              console.log(err)
            }
          );
          this.serviceClasse.getAllMatiere().subscribe(value => {
            this.matieres = value
        }, error1 => {
        })
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'professeur modifié avec succès',
            showConfirmButton: false,
            timer: 1500
          });
          this.formprofesseur.reset();
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

testEmail($event: any) {
  this.professeurService.verifieMail(this.formprofesseur.value.email).subscribe(value => {
      if (value['succes'] == true) {
          this.trouveEmail = true;
      } else {
          this.trouveEmail = false;
      }
  }, error1 => {
  })

}

testIdentifiant($event: any) {

  this.professeurService.verifieLogin(this.formprofesseur.value.login).subscribe(value => {
      if (value['succes'] == true) {
          this.trouveLogin = true;
      } else {
          this.trouveLogin = false;
      }
  }, error1 => {
  })
}

testTelephone($event: any) {
  this.professeurService.verifieTel(this.formprofesseur.value.telephone).subscribe(value => {
      if (value['succes'] == true) {
          this.trouveTel = true;
      } else {
          this.trouveTel = false;
      }
  }, error1 => {
  })

}

AddProfesseur() {
  // console.log(this.professeur);
  this.professeur.nom = this.formprofesseur.value.nom;
  this.professeur.prenom = this.formprofesseur.value.prenom;
  this.professeur.adresse = this.formprofesseur.value.adresse;
  this.professeur.telephone = this.formprofesseur.value.telephone;
  this.professeur.email = this.formprofesseur.value.email;
  this.professeur.login = this.formprofesseur.value.login;
  this.professeur.classeId = this.formprofesseur.value.classeId;
  this.professeur.matiereId = this.formprofesseur.value.matiereId;
  console.log(this.professeur);
  this.professeurService.addProfesseur(this.professeur).subscribe(
    result => {
      console.log(result);
      this.modalService.dismissAll();
      if (result['success']) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'professeur ajouté avec success',
          showConfirmButton: false,
          timer: 1500
        });
        this.professeurService.getAllProfeeseur().subscribe(
          (result) => {
            this.professeurs = result;
          },
          error => {
            console.log(error);
          }
        );
      }

      this.professeur = {
        // id:'',
        adresse: '',
        dateNaissance: '1999-03-31',
        email: '',
        lieuDeNaissance: 'null',
        nom: '',
        prenom: '',
        sexe: 'null',
        telephone: '',
        login: '',
        classeId: '',
        matiereId: ''
      };
    },
    error => {
      console.log(error)
    }
  )
}

searchFilter(e) {
  const searchStr = e.target.value.trim().toLowerCase();
  if (searchStr.length === 0) {
    // Si la chaîne de recherche est vide, réinitialise la liste
    this.professeurService.getAllProfeeseur().subscribe(
      (result) => {
        this.professeurs = result;
      },
      error => {
        console.log(error);
      }
    );
  } else {
    this.professeurs = this.professeurs.filter((professeur) => {
      return (professeur.nom && professeur.nom.toLowerCase().startsWith(searchStr)) ||
             (professeur.prenom && professeur.prenom.toLowerCase().startsWith(searchStr)) ||
             (professeur.telephone && professeur.telephone.toLowerCase().startsWith(searchStr)) ||
             (professeur.email && professeur.email.toLowerCase().startsWith(searchStr)) ||
             (professeur.adresse && professeur.adresse.toLowerCase().startsWith(searchStr)) ||
             (professeur.classeId && professeur.classeId.toLowerCase().startsWith(searchStr)) ||
             (professeur.matiereId && professeur.matiereId.toLowerCase().startsWith(searchStr));
    });
  }
}



}
