import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlerteNoteComponent} from "../alerte/alerte-note/alerte-note.component";
import {AlerteAbsenceComponent} from "../alerte/alerte-absence/alerte-absence.component";
import {AlerteMessageComponent} from "../alerte/alerte-message/alerte-message.component";
import {EleveComponent} from "./eleve/eleve.component";
import {MensualiteComponent} from "./mensualite/mensualite.component";
import {ListMensualiteComponent} from "./list-mensualite/list-mensualite.component";
import {ListInscriptionComponent} from "./list-inscription/list-inscription.component";
import {SuiviPaiementComponent} from "./suivi-paiement/suivi-paiement.component";

const routes: Routes = [
  {
    path: 'eleve',
    component: EleveComponent
  },
  {
    path: 'mensualite',
    component: MensualiteComponent
  },
  {
    path: 'listMensualite',
    component: ListMensualiteComponent
  },
  {
    path: 'listInscription',
    component: ListInscriptionComponent
  },
  {
    path: 'suivipaiement/:id',
    component: SuiviPaiementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionRoutingModule { }
