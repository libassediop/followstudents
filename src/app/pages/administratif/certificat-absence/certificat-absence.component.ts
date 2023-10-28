import { Component, OnInit } from '@angular/core';
import {Contenue, Note} from "../../../layouts/service/general.model";
import {FormBuilder} from "@angular/forms";
import {ClasseService} from "../../../layouts/service/classe.service";
import {EleveService} from "../../../layouts/service/eleve.service";
import {NoteService} from "../../../layouts/service/note.service";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
@Component({
  selector: 'app-certificat-absence',
  templateUrl: './certificat-absence.component.html',
  styleUrls: ['./certificat-absence.component.scss']
})
export class CertificatAbsenceComponent implements OnInit {
// bread crumb items
breadCrumbItems: Array<{}>;
transactions;
term: any;

//note: Note[] = [];
trouve: boolean = false;
eleves: any = [];
classes;
test: string = '0';
matieres;
rateControl: any;

contenue: Contenue = {
  idClasse: '',
  idEleve: '',
  idMatiere: '',
  noteEleve: '',
};
constructor(private fb : FormBuilder, private route: Router,private serviceClasse: ClasseService, private serviceEleve: EleveService) {


}

ngOnInit(): void {


  this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Saas', active: true }];


  this.serviceClasse.getAllClasseAvecInscris().subscribe(resp => {
    this.classes = resp;
  }, error1 => {
  });
  this.serviceClasse.getAllMatiere().subscribe(resp => {
    this.matieres = resp;
  }, error1 => {
  });


}

recuperation($event: Event) {
  this.test = this.contenue.idClasse;
  this.serviceEleve.getAllEleveByClasse(this.test).subscribe(resp => {
    this.eleves = resp;
  }, error1 => {
  });

}





suiviPaiement(matricule) {
  this.route.navigate(['/pages/inscription/suivipaiement', matricule]);
}
generateCertificate(nom,prenom,dateNaissance) {
  // Préparez les données de l'élève et du certificat ici
  // Par exemple, créez une chaîne HTML avec les détails de l'élève et du certificat
  const certificateContent = `
    <html>
      <head>
        <style>
          /* Ajoutez des styles CSS pour formater votre certificat */
        </style>
      </head>
      <body>
        <h1>Certificat d'absence</h1>
        <p>Nom de l'élève : ${nom} ${prenom}</p>
        <p>Date d'absence : ${dateNaissance}</p>
        <!-- Ajoutez d'autres détails du certificat -->
      </body>
    </html>
  `;

  // Ouvrez une nouvelle fenêtre pour afficher le certificat
  const newWindow = window.open('', '_blank');
  newWindow.document.open();
  newWindow.document.write(certificateContent);
  newWindow.document.close();

  // Imprimez la fenêtre
  newWindow.print();
}

printCertificate(){}

}
