import {Component, OnInit, TemplateRef} from '@angular/core';
import {CaisseService} from "../../../layouts/service/caisse.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-caisse-journalire',
  templateUrl: './caisse-journalire.component.html',
  styleUrls: ['./caisse-journalire.component.scss']
})
export class CaisseJournalireComponent implements OnInit {


  // bread crumb items
  breadCrumbItems: Array<{}>;
  selectValue = [];
  stateValue = [];
  detailCaisse= {
    nom: "",
    prenom: "",
    classe:"",
    dateNaissance:"",
    lieu:"",
    montant:0,
    avance:0,
    restant:0,
    date:'',
    mois:0,
  }

  journalier;
  mensualite;
  annuelle;
  totalJournalier=0;
  totalMensualite=0;
  totalAnnelle=0;

  constructor(private serviceCaisse:CaisseService,private modalService:NgbModal) { }

  ngOnInit() {
    this.serviceCaisse.getAllCaisseJournier().subscribe((resp) => {
      console.log(resp)
      this.journalier=resp['liste_complete'];
      this.totalJournalier=resp['montant_total'];
    }, err => {
      console.log(err)
    });

    this.serviceCaisse.getAllCaisseMensualité().subscribe((resp) => {
      console.log(resp)
      this.mensualite=resp['liste_complete'];
      this.totalMensualite=resp['montant_total'];
    }, err => {
      console.log(err)
    });

    this.serviceCaisse.getAllCaisseAnnuelle().subscribe((resp) => {
      console.log(resp)
      this.annuelle=resp['liste_complete'];
      this.totalAnnelle=resp['montant_total'];
    }, err => {
      console.log(err)
    });

    }



  getMonthNameById(monthId: number): string {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
      'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    if (monthId >= 1 && monthId <= 12) {
      return months[monthId - 1];
    } else {
      return 'Mois invalide';
    }
  }

  VoirDetail(recuDataModal: TemplateRef<any>,recuDataModalMensualite:TemplateRef<any>,detailCaisse:any) {
    if(detailCaisse.moisId){
      console.log(detailCaisse)
     this.detailCaisse.nom=detailCaisse.nom;
      this.detailCaisse.mois=detailCaisse.moisId;
     this.detailCaisse.prenom=detailCaisse.prenom;
     this.detailCaisse.dateNaissance=detailCaisse.dateNaissance;
     this.detailCaisse.lieu=detailCaisse.lieuDeNaissance;
     this.detailCaisse.montant=detailCaisse.montant;
     this.detailCaisse.avance=detailCaisse.avance;
     this.detailCaisse.restant=detailCaisse.restant;
     this.detailCaisse.date=detailCaisse.date;
     this.detailCaisse.classe=detailCaisse.libelle;
      this.modalService.open(recuDataModalMensualite, { centered: true });
    }else{
      console.log(detailCaisse)
      this.detailCaisse.nom=detailCaisse.nom;
      this.detailCaisse.prenom=detailCaisse.prenom;
      this.detailCaisse.dateNaissance=detailCaisse.dateNaissance;
      this.detailCaisse.lieu=detailCaisse.lieuDeNaissance;
      this.detailCaisse.montant=detailCaisse.montant;
      this.detailCaisse.avance=detailCaisse.avance;
      this.detailCaisse.restant=detailCaisse.restant;
      this.detailCaisse.date=detailCaisse.date;
      this.detailCaisse.classe=detailCaisse.libelle;
      this.modalService.open(recuDataModal, { centered: true });
    }


  }
  // formatMontant(montant: number): string {
  //   // Utilisez la méthode toLocaleString avec l'option 'fr-FR' pour formater le montant avec un espace comme séparateur des milliers.
  //   return montant.toLocaleString('fr-FR');
  // }
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

}

