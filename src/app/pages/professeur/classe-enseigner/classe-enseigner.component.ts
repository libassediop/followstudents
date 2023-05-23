import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartType } from 'ng-apexcharts';
import { ClasseService } from 'src/app/layouts/service/classe.service';
import { EleveService } from 'src/app/layouts/service/eleve.service';
import { Professeur } from 'src/app/layouts/service/general.model';
import { ProfesseurService } from 'src/app/layouts/service/professeur.service';
import Swal from 'sweetalert2';

export interface affecterProf {
  idClasse: string;
  idmatiere: string;
  idProf: string;
}

@Component({
  selector: 'app-classe-enseigner',
  templateUrl: './classe-enseigner.component.html',
  styleUrls: ['./classe-enseigner.component.scss']
})

export class ClasseEnseignerComponent implements OnInit {

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

  val: affecterProf = {
    idClasse: '',
    idmatiere: '',
    idProf: ''
}

form: FormGroup;
  transactions;
  revenueBarChart: ChartType ;
  statData = [
    {
      icon: 'bx bxs-school',
      title: 'Classes',
      value: '',

    },
    {
      icon: 'bx bxs-user',
      title: 'Eleves',
      value: ''
    }

  ];

  constructor(private modalService: NgbModal, private fb : FormBuilder,  private serviceClasse: ClasseService, private serviceProfesseur: ProfesseurService, private  route: ActivatedRoute,  private professeurService: ProfesseurService, private eleveService: EleveService) { 
   
  }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
    let login: string;
    login = this.route.snapshot.params.id;
    this.serviceProfesseur.getProfessurByLogin(login).subscribe(value => {
        this.data = value , console.log(this.data), this.nomPro = value['0'].prenom + ' ' + value['0'].nom, this.numPro = value['0'].telephone,this.adresse =value['0'].adresse,this.email =value['0'].email, this.val.idProf = value['0'].id
        this.serviceProfesseur.getlisteClasseByProfesseur(this.data['0'].id).subscribe(value => {
            this.classes = value , console.log(value)
            this.nbClasses = this.classes.length;
            this.statData[0].value = this.nbClasses;
        }, error1 => console.log(error1));
        console.log(this.classes)
        // this.eleveService. getAllEleveByClasse(this.data['0'].id).subscribe(value1 => {
        //   this.eleves = value1
        //   this.nbEleves = this.eleves.length
        //   this.statData[0].value = this.nbEleves;
        // } );
      
    }, error1 => console.log(error1))
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
   

}
