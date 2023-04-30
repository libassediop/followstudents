import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Personnel } from 'src/app/layouts/service/general.model';
import { ProfesseurService } from 'src/app/layouts/service/professeur.service';
import Swal from 'sweetalert2';
import { InvoiceList } from 'src/modeles/list.model';
import { catchError, switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrls: ['./personnel.component.scss']
})
export class PersonnelComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  term:any;
  formPersonnel : FormGroup;
  trouveTel = false;
  trouveLogin = false;
  trouveEmail = false

  idPersonnel;
  public personnels: any = [] ;
  personnel: Personnel = {
    nom: '',
    prenom: '',
    adresse: '',
    dateNaissance: '1999-01-01',
    email: '',
    lieuDeNaissance: 'null',
    sexe: 'null',
    telephone: '',
    login: ''
}
  constructor(private modalService : NgbModal, private professeurService: ProfesseurService,  public fb: FormBuilder) { 
    this.formPersonnel = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      login: ['', Validators.required],
      adresse: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.professeurService.getAllSecretaire().subscribe(
      (result) => {
      this.personnels = result;
      // console.log(this.personnels);
  }, error1 => {
      console.log(error1)
  });

   
  }
 

  /**
   * Open extra large modal
   * @param exlargeModal extra large modal data
   */
 extraLarge(exlargeModal: any) {
  this.modalService.open(exlargeModal, { size: 'xl', centered: true });
}

Addpersonnel() {
  console.log(this.personnel);
  this.personnel.nom = this.formPersonnel.value.nom; 
  this.personnel.prenom = this.formPersonnel.value.prenom; 
  this.personnel.adresse = this.formPersonnel.value.adresse;
  this.personnel.telephone = this.formPersonnel.value.telephone; 
  this.personnel.email = this.formPersonnel.value.telephone; 
  this.personnel.login = this.formPersonnel.value.login; 
  this.professeurService.addSecretaire(this.personnel).subscribe(
    result => {
      console.log(result);
      this.modalService.dismissAll();
      if (result['success']) {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'personnel ajouté avec success',
          showConfirmButton: false,
          timer: 1500
        });
        this.professeurService.getAllSecretaire().subscribe(
          (result) => {
            this.personnels = result;
          },
          error => {
            console.log(error);
          }
        );

      }
      this.personnel = {
        // id:'',
        nom: '',
        prenom: '',
        adresse: '',
        dateNaissance: '1999-01-01',
        email: '',
        lieuDeNaissance: 'null',
        sexe: 'null',
        telephone: '',
        login: ''
      };
    },
    error => {
      console.log(error)
    }
  )
}


testEmail($event: any) {
  this.professeurService.verifieMail(this.personnel.email).subscribe(value => {
      if (value['succes'] == true) {
          this.trouveEmail = true;
      } else {
          this.trouveEmail = false;
      }
  }, error1 => {
  })

}

testIdentifiant($event: any) {

  this.professeurService.verifieLogin(this.personnel.login).subscribe(value => {
      if (value['succes'] == true) {
          this.trouveLogin = true;
      } else {
          this.trouveLogin = false;
      }
  }, error1 => {
  })
}

testTelephone($event: any) {
  this.professeurService.verifieTel(this.personnel.telephone).subscribe(value => {
      if (value['succes'] == true) {
          this.trouveTel = true;
      } else {
          this.trouveTel = false;
      }
  }, error1 => {
  })

}

//   getSecretaireById(login) {
//     this.professeurService.getSecretaireByLogin(login).subscribe(value => {
//       this.formPersonnel.setValue({
//         libelle: value[0].libelle,
//         nom: value[0].nom,
//         prenom: value[0].prenom,
//         adresse: value[0].adresse,
//         telephone: value[0].telephone,
//         email: value[0].telephone,
//         login: value[0].Login,
//         });
//        this.idPersonnel=login;
//        },error1 => {
   
//        })
// }
ModalUpdatePersonnel(login, centerModal?: any) {
  this.professeurService.getSecretaireByLogin(login).subscribe(value => {
    this.formPersonnel.setValue({
      nom: value[0].nom,
      prenom: value[0].prenom,
      adresse: value[0].adresse,
      telephone: value[0].telephone,
      email: value[0].email,
      login: value[0].login,
      });
     this.idPersonnel=value[0].id;
     },error1 => {
 
     })
  this.modalService.open(centerModal, {centered: true});
}

  updatePersonnel() {
  this.personnel.nom = this.formPersonnel.value.nom; 
  this.personnel.prenom = this.formPersonnel.value.prenom; 
  this.personnel.adresse = this.formPersonnel.value.adresse;
  this.personnel.telephone = this.formPersonnel.value.telephone; 
  this.personnel.email = this.formPersonnel.value.telephone; 
  this.personnel.login = this.formPersonnel.value.login; 
  console.log(this.idPersonnel, this.personnel)
    this.professeurService.updatePersonnel(this.idPersonnel, this.personnel).subscribe(
      result => {
        if (result['success']) {
          this.modalService.dismissAll();
          this.professeurService.getAllSecretaire().subscribe(
            (result) => {
              this.personnels = result;
            },
            err => {
              console.log(err)
            }
          );
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'personnel modifié avec succès',
            showConfirmButton: false,
            timer: 1500
          });
          this.formPersonnel.reset();
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

  searchFilter(e) {
    const searchStr = e.target.value;
    if (searchStr.length === 0) {
      this.professeurService.getAllSecretaire().subscribe(
        (result) => {
          this.personnels = result;
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.personnels = this.personnels.filter((personnel) => {
        return personnel.nom.toLowerCase().startsWith(searchStr.toLowerCase()),
        personnel.telephone.toLowerCase().startsWith(searchStr.toLowerCase()),
        personnel.email.toLowerCase().startsWith(searchStr.toLowerCase()),
        personnel.adresse.toLowerCase().startsWith(searchStr.toLowerCase())
        
        ;
      });
    }
  }
  
 

}
