import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {ChartType} from "ng-apexcharts";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ClasseService} from "../../../layouts/service/classe.service";
import {ProfesseurService} from "../../../layouts/service/professeur.service";
import {ActivatedRoute} from "@angular/router";
import {EleveService} from "../../../layouts/service/eleve.service";
import Swal from "sweetalert2";
import {affecterProf} from "../../professeur/classe-enseigner/classe-enseigner.component";
import {InscriptionreinscriptionService} from "../../../layouts/service/inscriptionreinscription.service";
import {Historique, Inscription, Mensualite} from "../../../layouts/service/general.model";

@Component({
  selector: 'app-suivi-paiement',
  templateUrl: './suivi-paiement.component.html',
  styleUrls: ['./suivi-paiement.component.scss']
})
export class SuiviPaiementComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  term: any;
  numPro: any;
  nomPro : any;
  email: any;
  adresse : any;
  data;
  classes:  any = [];
  classe;
  nbClasses;
  nbEleves;
  matieres:  any = [] ;
  matiere;
  eleves;
  matricule;
  donneesEleve;
  donneesPaiement;
  donneesHistorique;
  listMois;
  formMensualite: FormGroup;
  nombreMoisPaye : '0';
  nombreMoisNonPaye : any;

  idMensualite : any;

  val: affecterProf = {
    idClasse: '',
    idmatiere: '',
    idProf: ''
  }
  nomtantApayer=0;
  reduction=0;
  reliquat=0
  ;idMens;

  mensualite: Mensualite = {
   moisId: '',
    montant:0,
    eleveId:'',
    reduction:0,
    reliquat:0,
    userId:localStorage.getItem('id')

  };
  historique:Historique={
    moisId: '',
    eleveId: '',
    montant:0,
    montantTotal:0,
    reduction:0,
    recu:0,
    classeId: '',
    mensualiteId: '',
    reliquat:0,
    anneescolaireId: '',
    restant:0

  }

  restantModal : any;
  nomModal :any;
  prenomModal : any;
  valueAvanceModal : any;
  formInscriptionAvance: FormGroup;


  form: FormGroup;
  transactions;
  revenueBarChart: ChartType ;
  statData = [
    {
      icon: 'bx bxs-school',
      title: 'Nombre de mois à payer',
      value: '',

    },
    {
      icon: 'bx bxs-user',
      title: 'Nombre de mois payé',
      value: ''
    }

  ];

  constructor(private modalService: NgbModal, private fb : FormBuilder,  private serviceInscription: InscriptionreinscriptionService, private serviceClasse: ClasseService, private serviceProfesseur: ProfesseurService, private  route: ActivatedRoute,  private professeurService: ProfesseurService, private seviceInscription:InscriptionreinscriptionService,private eleveService: EleveService) {

  }
  selectValue: string[];
  ngOnInit() {

    this.selectValue = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Novembre', 'Decembre'];

    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this.formMensualite = this.fb.group({
      // Ajoutez ici les contrôles de vot
      mois: ['', Validators.required],
      montant: ['', Validators.required],
      avance: ['', Validators.required]
    })

    this.formInscriptionAvance = this.fb.group({
      // Ajoutez ici les contrôles de vot
      avance: [{ value: '', disabled: false }, Validators.required],

    })


    this.matricule = this.route.snapshot.params.matricule;
    this.eleveService.getEleveByMatricule(this.matricule).subscribe(resp => {
      //console.log(resp)
      this.donneesEleve = resp[0];
      this.serviceInscription.getHistoriqueByEleveByClasse(this.donneesEleve.id,this.donneesEleve.id_classe).subscribe(
        resp=>{
          console.log(resp['historique']);
          this.donneesHistorique=resp['historique']
        },err =>{console.log(err)}
      )
      this.seviceInscription.getMensualitePayerByEleve(this.donneesEleve.id).subscribe(resp => {
        this.donneesPaiement = resp['response'];
        this.reduction=this.donneesPaiement[0].reduction;
        this.statData[1].value = resp['nombre de mois payer'];
        this.statData[0].value = (9 - Number(resp['nombre de mois payer'])).toString()
      });
      this.serviceClasse.getAllMoisInvalideByEleve(this.donneesEleve.id).subscribe(resp => {
        this.listMois= resp['mois'];
      })
    }, error1 => {
      console.log(error1)
    });

  }



  getLibelleMoisById(moisId: number): string {
    const mois = [
      'Octobre', 'Novembre', 'Décembre','Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre'
    ];

    if (moisId >= 1 && moisId <= 12) {
      return mois[moisId - 1];
    } else {
      return 'Mois invalide';
    }
  }
  /**
   * Open modal
   * @param content modal content
   */

  currentPage = 1;
  pageSize =  6 ;

  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.classes.length);
  }

  convertToNumber(value: string | number): number {
    return typeof value === 'string' ? parseFloat(value) : value as number;
  }

  Valider() {
    this.mensualite.eleveId=this.donneesEleve.id;
    this.mensualite.montant = this.formMensualite.value.avance;
    this.mensualite.moisId = this.formMensualite.value.mois;
    if(this.mensualite.montant<=this.reliquat){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erreur lors du paiement : Le montant saisi doit être supérieur au montant du reliquat.',
        showConfirmButton: false,
        timer: 4500
      });
    }
    else if(this.mensualite.montant>(this.reliquat+this.nomtantApayer)){
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Erreur lors du paiement : Le montant saisi ne doit être supérieur au montant total à payer.',
        showConfirmButton: false,
        timer: 4500
      });
    }
    else{
      if(this.reliquat){
        this.serviceInscription.detteMensuelle(this.idMens,this.reliquat).subscribe(
          result => {
            if (result['success']) {

            }
            else {
              Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Erreur lors du réglement de dette :'+ result['message'],
                showConfirmButton: false,
                timer: 4500
              });
            }
          },
          error => {
            Swal.fire({
              position: 'top-end',
              icon: 'error',
              title: 'Erreur lors du réglement de dette :'+ error,
              showConfirmButton: false,
              timer: 4500
            });
            console.log(error)
          }
        );
        this.mensualite.montant = this.formMensualite.value.avance - this.reliquat;
      }
      console.log(this.reliquat)
      this.mensualite.reliquat=this.reliquat;
      this.seviceInscription.addMensualite(this.mensualite).subscribe(res => {

        if (res['success']) {
          var reliq=this.reliquat;
          console.log(this.reliquat);
         this.historique.eleveId= res['mensualite'].eleveId;
           this.historique.reduction= res['mensualite'].reduction;
           this.historique.reliquat = this.mensualite.reliquat;
          this.historique.moisId= res['mensualite'].moisId;
           this.historique.montant= res['mensualite'].montant;
           this.historique.montantTotal = res['mensualite'].montant - res['mensualite'].reduction + this.mensualite.reliquat ;
          this.historique.recu= this.formMensualite.value.avance;
          this.historique.restant= res['mensualite'].restant;
          this.historique.anneescolaireId= res['mensualite'].anneeScolaireId;
          this.historique.mensualiteId= res['mensualite'].id;
          this.historique.classeId=this.donneesEleve.id_classe;
          console.log(this.historique)
          this.serviceInscription.addHistorique(this.historique).subscribe(
            (resp)=>{console.log(resp)}, err=>{console.log(err)}
          )
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Paiement effectué avec succès',
            showConfirmButton: false,
            timer: 4500
          });

          this.formMensualite.reset();
          this.eleveService.getEleveByMatricule(this.matricule).subscribe(resp => {
            //console.log(resp)
            this.donneesEleve = resp[0];
            this.serviceInscription.getHistoriqueByEleveByClasse(this.donneesEleve.id,this.donneesEleve.id_classe).subscribe(
              resp=>{
                console.log(resp['historique']);
                this.donneesHistorique=resp['historique']
              },err =>{console.log(err)}
            )
            this.seviceInscription.getMensualitePayerByEleve(this.donneesEleve.id).subscribe(resp => {
              this.donneesPaiement = resp['response'];
              this.reduction=this.donneesPaiement[0].reduction;
              this.statData[1].value = resp['nombre de mois payer'];
              this.statData[0].value = (9 - Number(resp['nombre de mois payer'])).toString()
            });
            this.serviceClasse.getAllMoisInvalideByEleve(this.donneesEleve.id).subscribe(resp => {
              this.listMois= resp['mois'];
            })
          }, error1 => {
            console.log(error1)
          });
        }
        else{
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Erreur lors du paiement : '+res['message'],
            showConfirmButton: false,
            timer: 4500
          });

        }

      });
      this.nomtantApayer=0;
      this.reliquat=0;
    }


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


ModalAvance(id,restant,nom,prenom, centerModal?: any) {
  this.restantModal = restant;
  this.nomModal = nom;
  this.prenomModal = prenom;
  this.idMensualite = id;
  this.modalService.open(centerModal, {centered: true});
  }

  updateAvance(){
    this.valueAvanceModal = this.formInscriptionAvance.value.avance;
    console.log(this.idMensualite);
    console.log(this.formInscriptionAvance.value.avance)
    this.serviceInscription.detteMensuelle(this.idMensualite,this.valueAvanceModal).subscribe(
      result => {
        if (result['success']) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Réglement de dette : montant reçu avec succès',
            showConfirmButton: false,
            timer: 4500
          });

          this.formInscriptionAvance.reset();
          this.modalService.dismissAll();
          this.eleveService.getEleveByMatricule(this.matricule).subscribe(resp => {
            this.donneesEleve = resp[0];
            this.seviceInscription.getMensualitePayerByEleve(this.donneesEleve.id).subscribe(resp => {
              this.donneesPaiement = resp['response'];
              this.statData[1].value = resp['nombre de mois payer'];
              this.statData[0].value = (9 - Number(resp['nombre de mois payer'])).toString()
            });
          }, error1 => {
          });
        }
        else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Erreur lors du réglement de dette :'+ result['message'],
            showConfirmButton: false,
            timer: 4500
          });
        }
      },
      error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Erreur lors du réglement de dette :'+ error,
          showConfirmButton: false,
          timer: 4500
        });
        console.log(error)
      }
    )
  }

  annuler() {

    //this.formPersonnel.reset();
    this.modalService.dismissAll();

  }

  changeItemsPerPage() {
    console.log(this.formMensualite.value.mois);
    console.log(this.formMensualite.value.mois);
    this.serviceInscription.getMoisRestantApayerByEleve(this.donneesEleve.id).subscribe(
      (resp)=>{
        if(resp[0]){
          this.reliquat=resp[0].restant;
          this.idMens=resp[0].id;
        }
      }
    )

    this.serviceClasse.getMontantByClasseByMois(this.donneesEleve.id_classe,this.formMensualite.value.mois).subscribe(
      (res)=>{
        this.nomtantApayer=res[0].montant;
        console.log(res);
      }
    )
  }

  openModalHistorique(content) {
    this.modalService.open(content, {size:'xl', centered: true });
  }
}
