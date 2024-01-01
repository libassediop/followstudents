import {Component, OnInit, TemplateRef} from '@angular/core';
import {ClasseService} from "../../../layouts/service/classe.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import Swal from "sweetalert2";
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.scss']
})
export class ParametreComponent implements OnInit {

  formMontantMoi: FormGroup;

  montantMoi: { id: number, montant: number,libelle:string ,classe_id:number }[] = [];
  breadCrumbItems: Array<{}>;
  selectValue = [];
  stateValue = [];
  classes;
  idmois;
  libClasse;
  classeId;
  libeleMois:'';
  montMois:'';

  constructor(private serviceClasse:ClasseService,private modalService : NgbModal,private fb : FormBuilder) { }

  ngOnInit() {

    this.serviceClasse.listClassesWithMontantMois().subscribe(
      (result)=>{
        this.classes=result
        // Trier les classes initiales
        console.log(this.classes)
      },
      err =>{
        console.log(err)
      }
    );
    this.formMontantMoi = this.fb.group({
      // Ajoutez ici les contrôles de vot
      octobre: [{ value: '', disabled: false }, Validators.required],
      novembre: [{ value: '', disabled: false }, Validators.required],
      decenbre: [{ value: '', disabled: false }, Validators.required],
      janvier: [{ value: '', disabled: false },Validators.required],
      fevrier: [{ value: '', disabled: false },Validators.required],
      mars: [{ value: '', disabled: false },Validators.required],
      avril: [{ value: '', disabled: false }, Validators.required],
      mai: [{ value: '', disabled: false }, Validators.required],
      juin: [{ value: '', disabled: false }, Validators.required],
    });


  }
id;
  updateMontantMois(value,libelle,contentAddMontant: TemplateRef<any>) {
    console.log(value);
    this.id=value.id;
    this.idmois=value.idMois;
    this.libClasse=libelle;
    this.libeleMois=value.libelleMois;
    this.montMois=value.montant, this.classeId=value.classe_id;
    this.modalService.open(contentAddMontant, {centered: true});
  }


  OpenModalAdd(classId,libelle, contentAddMontant: TemplateRef<any>) {
    this.libClasse=libelle;
    this.classeId=classId;
    console.log(this.classeId)
    this.modalService.open(contentAddMontant, {centered: true});
  }

  annuler() {
    this.modalService.dismissAll();
  }
  AddMontantMois() {
    this.montantMoi = [];

    // Ajoutez les éléments dans le tableau sans changer l'ordre
    this.montantMoi.push({ id: 1, montant: this.formMontantMoi.value.octobre, libelle: 'Octobre', classe_id: this.classeId });
    this.montantMoi.push({ id: 2, montant: this.formMontantMoi.value.novembre, libelle: 'Novembre', classe_id: this.classeId });
    this.montantMoi.push({ id: 3, montant: this.formMontantMoi.value.decenbre, libelle: 'Décembre', classe_id: this.classeId });
    this.montantMoi.push({ id: 4, montant: this.formMontantMoi.value.janvier, libelle: 'Janvier', classe_id: this.classeId });
    this.montantMoi.push({ id: 5, montant: this.formMontantMoi.value.fevrier, libelle: 'Février', classe_id: this.classeId });
    this.montantMoi.push({ id: 6, montant: this.formMontantMoi.value.mars, libelle: 'Mars', classe_id: this.classeId });
    this.montantMoi.push({ id: 7, montant: this.formMontantMoi.value.avril, libelle: 'Avril', classe_id: this.classeId });
    this.montantMoi.push({ id: 8, montant: this.formMontantMoi.value.mai, libelle: 'Mai', classe_id: this.classeId });
    this.montantMoi.push({ id: 9, montant: this.formMontantMoi.value.juin, libelle: 'Juin', classe_id: this.classeId });

    console.log(this.montantMoi);

    const observables = this.montantMoi.map(montant => {
      return this.serviceClasse.addMontantMoisbyClasses(montant.id, montant.libelle, montant.classe_id, montant.montant, '1');
    });

    forkJoin(observables).subscribe(
      (responses) => {
        responses.forEach((res, index) => {
          if (res['success']) {
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Montant ' + this.montantMoi[index].libelle + ' ajouté avec succès',
              showConfirmButton: false,
              timer: 1500
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops... L\'ajout de la classe a échoué',
              text: 'Erreur lors de l\'ajout'
            });
          }
        });
        this.formMontantMoi.reset();

        this.serviceClasse.listClassesWithMontantMois().subscribe(
          (result) => {
            this.classes = result;
            // Trier les classes initiales
            console.log(this.classes)
          },
          err => {
            console.log(err);
          }
        );
      },
      error => {
        console.log(error);
      }
    );
    this.modalService.dismissAll();
  }

  formatMontant(montant: number): string {
    // Vérifiez d'abord si montant est défini et n'est pas null
    if (montant !== null && montant !== undefined) {
      // Utilisez la méthode toLocaleString avec l'option 'fr-FR' pour formater le montant avec un espace comme séparateur des milliers.
      return montant.toLocaleString('fr-FR');
    } else {
      // Gérez le cas où montant est null ou non défini, par exemple, en renvoyant une chaîne vide.
      return '';
    }
  }

  // AddMontantMois() {
  //   this.montantMoi = []; // Réinitialise le tableau
  //
  //   // Ajoute les valeurs correspondantes au tableau
  //   this.montantMoi.push({ id: 1, montant: this.formMontantMoi.value.octobre ,libelle:'Octobre',classe_id:this.classeId});
  //   this.montantMoi.push({ id: 2, montant: this.formMontantMoi.value.novembre,libelle:'Novembre',classe_id:this.classeId });
  //   this.montantMoi.push({ id: 3, montant: this.formMontantMoi.value.decenbre,libelle:'Décembre',classe_id:this.classeId });
  //   this.montantMoi.push({ id: 4, montant: this.formMontantMoi.value.janvier,libelle:'Janvier',classe_id:this.classeId });
  //   this.montantMoi.push({ id: 5, montant: this.formMontantMoi.value.fevrier,libelle:'Février',classe_id:this.classeId });
  //   this.montantMoi.push({ id: 6, montant: this.formMontantMoi.value.mars,libelle:'Mars',classe_id:this.classeId });
  //   this.montantMoi.push({ id: 7, montant: this.formMontantMoi.value.avril ,libelle:'Avril',classe_id:this.classeId});
  //   this.montantMoi.push({ id: 8, montant: this.formMontantMoi.value.mai ,libelle:'Mai',classe_id:this.classeId});
  //   this.montantMoi.push({ id: 9, montant: this.formMontantMoi.value.juin,libelle:'Juin',classe_id:this.classeId });
  //
  //   console.log(this.montantMoi);
  //
  //   this.montantMoi.forEach(montant => {
  //     this.serviceClasse.addMontantMoisbyClasses(montant.id,montant.libelle,montant.classe_id,montant.montant,'1').subscribe(
  //       (res)=>{
  //         if (res['success']) {
  //           Swal.fire({
  //             position: 'top-end',
  //             icon: 'success',
  //             title: 'Montant '+montant.libelle+' ajouté avec succès',
  //             showConfirmButton: false,
  //             timer: 1500
  //           });
  //           this.formMontantMoi.reset()
  //
  //         }
  //         else {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Oops... L\'ajout de la classe a échoué',
  //             text: 'Erreur lors de l\'ajout'
  //           });
  //         }
  //         console.log(res)
  //       },error => {
  //         console.log(error)
  //       }
  //     );
  //     this.serviceClasse.listClassesWithMontantMois().subscribe(
  //       (result)=>{
  //         this.classes=result
  //         // Trier les classes initiales
  //         console.log(this.classes)
  //       },
  //       err =>{
  //         console.log(err)
  //       }
  //     );
  //     // Pour chaque élément dans le tableau 'montants', montant contient l'objet actuel.
  //
  //     // Vous pouvez effectuer vos opérations ici, par exemple, les envoyer au backend.
  //   });
  //
  //   }

  UpdateMois() {
 console.log(this.idmois,this.libeleMois,this.classeId,this.montMois,'1',this.id)
  this.serviceClasse.updateMontantMoisbyClasses(this.idmois,this.libeleMois,this.classeId,this.montMois,'1',this.id).subscribe(
    (resp)=>{
     console.log(resp)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Montant ' + this.libeleMois + ' modifié avec succès',
        showConfirmButton: false,
        timer: 1500
      });
      this.modalService.dismissAll();
      this.serviceClasse.listClassesWithMontantMois().subscribe(
        (result) => {
          this.classes = result;
          // Trier les classes initiales
          console.log(this.classes)
        },
        err => {
          console.log(err);
        }
      );
    },(err)=>{
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops... La modification a échoué',
        text: 'Erreur lors de La modification'
      });
    }
  )
  }
}
