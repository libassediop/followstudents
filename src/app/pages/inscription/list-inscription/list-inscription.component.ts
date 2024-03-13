import { Component, OnInit } from '@angular/core';
import { Contenue, HistoriqueDetteIns, Note } from "../../../layouts/service/general.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ClasseService } from "../../../layouts/service/classe.service";
import { EleveService } from "../../../layouts/service/eleve.service";
import { NoteService } from "../../../layouts/service/note.service";
import Swal from "sweetalert2";
import { InscriptionList } from './list-inscription.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InscriptionreinscriptionService } from 'src/app/layouts/service/inscriptionreinscription.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-list-inscription',
  templateUrl: './list-inscription.component.html',
  styleUrls: ['./list-inscription.component.scss'],
  providers: [DatePipe]
})
export class ListInscriptionComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  transactions;
  term: any;

  note: Note[] = [];
  trouve: boolean = false;
  eleves: any = [];
  classes;
  test: string = '0';
  matieres;
  rateControl: any;
  idInscription: any;
  currentPage: number = 1;
  pageSize: number = 10;
  filteredInscription: any[] = [];
  pagedInscription: InscriptionList[] = []; // Ajoutez cette propriété
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedInscription: string = '';
  selectedStatus: string = "Tous";
  restantModal: any;
  nomModal: any;
  prenomModal: any;
  valueAvanceModal: any;
  donneesHistorique;
  formInscriptionAvance: FormGroup;

  contenue: Contenue = {
    idClasse: '',
    idEleve: '',
    idMatiere: '',
    noteEleve: '',
  };
  historiquedetteIns: HistoriqueDetteIns = {
    idIns: '',
    montantRecu: 0,
    montantApayer: 0,
    montantResttant: 0,
  }

  detailCaisseDonnees = {
    nom: "",
    prenom: "",
    classe: "",
    dateNaissance: "",
    lieu: "",
    montant: 0,
    avance: 0,
    restant: 0,
    date: '',
    mois: 0,
  }
  constructor(private fb: FormBuilder, private datePipe: DatePipe, private modalService: NgbModal, private serviceClasse: ClasseService, private serviceEleve: EleveService, private serviceInscription: InscriptionreinscriptionService) {
  }


  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Saas', active: true }];

    this.formInscriptionAvance = this.fb.group({
      // Ajoutez ici les contrôles de vot
      avance: [{ value: '', disabled: false }, Validators.required],

    })

    this.serviceClasse.getAllClasseAvecInscris().subscribe(resp => {
      this.classes = resp;
    }, error1 => {
    });
    this.serviceClasse.getAllMatiere().subscribe(resp => {
      this.matieres = resp;
    }, error1 => {
    });

  }

  // Fonction pour fermer le modal lorsque le modal est masqué
  onCloseModal() {
    // Fermez le modal en utilisant le service modal
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
  convertToNumber(value: string | number): number {
    return typeof value === 'string' ? parseFloat(value) : value as number;
  }
  recuperation($event: Event) {
    this.test = this.contenue.idClasse;
    this.serviceEleve.getAllInscriptionByClasse(this.test).subscribe((result: InscriptionList[]) => {
      this.filteredInscription = this.eleves = result; // Initialize both arrays
      this.filterInscription();
    },
      (err) => {
        console.log(err);
      }
    );
  }
  filterInscription() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedInscription = this.filteredInscription
      .slice(startIndex, endIndex)
      .sort((a, b) => {
        if (this.sortDirection === 'asc') {
          return a.nom.localeCompare(b.nom);
        } else {
          return b.nom.localeCompare(a.nom);
        }
      });
  }
  changeItemsPerPage() {
    this.filterInscription();
  }
  changePageSize(size: number) {
    this.pageSize = size;
    this.currentPage = 1; // Réinitialiser la page courante à 1
    this.filterInscription();
  }
  SearchFilter(e) {
    const searchStr = e.target.value.trim().toLowerCase();
    if (searchStr.length === 0) {
      this.filteredInscription = this.eleves;
    } else {
      this.filteredInscription = this.eleves.filter((eleve) => {
        const fullName = `${eleve.nom} ${eleve.prenom}`.toLowerCase();
        return fullName.includes(searchStr);
      });
    }
    this.filterInscription();
  }
  pageChanged(page: number) {
    this.currentPage = page;
    this.filterInscription();
  }
  toggleSortDirection() {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.filterInscription();
  }
  imprimerMensualite() {
    const printContents = document.getElementById('table-container').innerHTML; // Obtenez le contenu HTML de la table
    const originalContents = document.body.innerHTML; // Obtenez le contenu HTML de la page

    // Créez une balise title pour définir le titre de la page d'impression
    const pageTitle = "<title>Liste de toutes les élèves</title>";

    // Remplacez le contenu actuel de la page par le contenu de la table avec la balise title
    document.body.innerHTML = pageTitle + printContents;

    // Appelez la fonction window.print() pour imprimer la table
    window.print();

    // Restaurez le contenu original de la page
    document.body.innerHTML = originalContents;
  }
  filterByStatus(status: string) {
    if (status === "Tous") {
      this.filteredInscription = this.eleves;
    } else {
      this.filteredInscription = this.eleves.filter(eleve => eleve.status_payement == status);

    }
    this.filterInscription();
    this.currentPage = 1;
  }

  ModalAvance(id, restant, nom, prenom, centerModal?: any) {
    this.restantModal = restant;
    this.nomModal = nom;
    this.prenomModal = prenom;
    this.idInscription = id;
    this.modalService.open(centerModal, { centered: true });
  }

  updateAvance() {
    this.valueAvanceModal = this.formInscriptionAvance.value.avance;
    this.serviceInscription.detteInscription(this.idInscription, this.valueAvanceModal).subscribe(
      result => {
        if (result['success']) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Réglement de dette : montant reçu avec succès',
            showConfirmButton: false,
            timer: 1500
          });
          let restant = this.restantModal;
          this.historiquedetteIns.idIns = this.idInscription;
          this.historiquedetteIns.montantRecu = this.valueAvanceModal;
          this.historiquedetteIns.montantResttant = restant - this.valueAvanceModal;
          this.historiquedetteIns.montantApayer = this.restantModal;
          this.serviceInscription.addHistoriqueDetteins(this.historiquedetteIns).subscribe(
            res => { console.log(res); }, err => { console.log(err); }
          )

          this.formInscriptionAvance.reset();
          this.modalService.dismissAll();
          this.serviceEleve.getAllInscriptionByClasse(this.test).subscribe((result: InscriptionList[]) => {
            this.filteredInscription = this.eleves = result; // Initialize both arrays
            this.filterInscription();
          },
            (err) => {
              console.log(err);
            }
          );
        }
        else {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'Erreur lors du réglement de dette :' + result['message'],
            showConfirmButton: false,
            timer: 1500
          });
        }
      },
      error => {
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'Erreur lors du réglement de dette :' + error,
          showConfirmButton: false,
          timer: 1500
        });
        console.log(error)
      }
    )
  }

  annuler() {

    //this.formPersonnel.reset();
    this.modalService.dismissAll();

  }

  historiqueInscription(id: number, centerModal?: any) {
    this.serviceInscription.getHistoriqueDetteByIns(id).subscribe(
      (resp) => {
        this.donneesHistorique = resp;
      }, error => { console.log(error); }
    );
    this.modalService.open(centerModal, { centered: true, size: 'lg' });
  }

  imprimer(detailCaisse: any) {
    console.log(detailCaisse)
    this.detailCaisseDonnees.date = detailCaisse.date
    const printContents = document.getElementById('table-container-imprimer').innerHTML; // Obtenez le contenu HTML de la table
    const originalContents = document.body.innerHTML; // Obtenez le contenu HTML de la page

    // Créez une balise title pour définir le titre de la page d'impression
    const pageTitle = "<title>Inscription</title>";

    // Remplacez le contenu actuel de la page par le contenu de la table avec la balise title
    document.body.innerHTML = pageTitle + printContents;

    // Appelez la fonction window.print() pour imprimer la table
    window.print();

    // Restaurez le contenu original de la page
    document.body.innerHTML = originalContents;
  }

  getMonthNameById(monthId: number): string {
    const months = [
      'Octobre', 'Novembre', 'Décembre', 'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre'
    ];

    if (monthId >= 1 && monthId <= 12) {
      return months[monthId - 1];
    } else {
      return 'Mois invalide';
    }
  }

  getDate(): string {
    const currentDate = new Date();
    return this.datePipe.transform(currentDate, 'dd/MM/yyyy') || '';
  }
}
