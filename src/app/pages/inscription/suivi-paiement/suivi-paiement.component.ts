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
import {Inscription, Mensualite} from "../../../layouts/service/general.model";

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
  formMensualite: FormGroup;

  val: affecterProf = {
    idClasse: '',
    idmatiere: '',
    idProf: ''
  }


  mensualite: Mensualite = {
   moisId: '',
    montant:'',
    eleveId:'',
    userId:localStorage.getItem('id')

  };

  form: FormGroup;
  transactions;
  revenueBarChart: ChartType ;
  statData = [
    {
      icon: 'bx bxs-school',
      title: 'Nombre de mois à payer',
      value: '9',

    },
    {
      icon: 'bx bxs-user',
      title: 'Nombre de mois payer',
      value: '3'
    }

  ];

  constructor(private modalService: NgbModal, private fb : FormBuilder,  private serviceClasse: ClasseService, private serviceProfesseur: ProfesseurService, private  route: ActivatedRoute,  private professeurService: ProfesseurService, private seviceInscription:InscriptionreinscriptionService,private eleveService: EleveService) {

  }
  selectValue: string[];
  ngOnInit() {
    this.selectValue = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Novembre', 'Decembre'];

    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    this.formMensualite = this.fb.group({
      // Ajoutez ici les contrôles de vot
      mois: ['', Validators.required],
      montant: ['', Validators.required],
      avance: ['', Validators.required],
    })

    this.matricule = this.route.snapshot.params.matricule;
    console.log(this.matricule);

    this.eleveService.getEleveByMatricule(this.matricule).subscribe(resp => {
      console.log(resp)
      this.donneesEleve = resp;
      this.seviceInscription.getMensualitePayerByEleve(this.donneesEleve[0].id).subscribe(resp => {
        this.donneesPaiement = resp['response'];
      });
    }, error1 => {
    });




    this.serviceClasse.getAllClasse().subscribe(resp => {
      this.classe = resp;
    }, error1 => {
      console.log(error1)
    });
    this.serviceClasse.getAllMatiere().subscribe(
      resp => {
        this.matieres= resp;
      }, error1 => {
      });
  }



  getLibelleMoisById(moisId: number): string {
    const mois = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
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
  openModalAffecterClasse(content) {
    this.modalService.open(content, {centered: true });
  }

  affecterProfesseur(form: NgForm) {
    // console.log(this.professeur)
    this.professeurService.affecterClasse(this.val.idClasse, this.val.idProf, this.val.idmatiere).subscribe(
      result => {
        console.log(result);
        this.modalService.dismissAll();
        if (result['success']) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'affectation reussie',
            showConfirmButton: false,
            timer: 1500
          });
          this.professeurService.getlisteClasseByProfesseur(this.val.idProf).subscribe(result => {
              this.classes = result,
                this.val.idClasse= '',
                this.val.idmatiere= ''
            },
            error => {
              console.log(error);
            }
          );
          // let login: string;
          // login = this.route.snapshot.params.id;
          // this.professeurService.getProfessurByLogin(login).subscribe(
          //   (result) => {
          //     this.classes = result;
          //     this.matieres = result;
          //   },
          //   error => {
          //     console.log(error);
          //   }
          // );
        }
      },
      error => {
        console.log(error)
      }
    )
  }


  currentPage = 1;
  pageSize =  6 ;

  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.classes.length);
  }


  Valider() {
    this.mensualite.eleveId=this.donneesEleve[0].id;
    this.mensualite.montant = this.formMensualite.value.avance;
    this.mensualite.moisId = this.formMensualite.value.mois;
    console.log(this.mensualite);
    this.seviceInscription.addMensualite(this.mensualite).subscribe(res => {
      console.log(res);
      this.seviceInscription.getMensualitePayerByEleve(this.donneesEleve[0].id).subscribe(resp => {
        this.donneesPaiement = resp['response'];
      });
      }
    );

  }
}
