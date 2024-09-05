import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EleveComponent} from "./eleve/eleve.component";
import {MensualiteComponent} from "./mensualite/mensualite.component";
import {ListMensualiteComponent} from "./list-mensualite/list-mensualite.component";
import {ListInscriptionComponent} from "./list-inscription/list-inscription.component";
import {SuiviPaiementComponent} from "./suivi-paiement/suivi-paiement.component";
import { DetailComponent } from './detail/detail.component';

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
    path: 'suivipaiement/:matricule',
    component: SuiviPaiementComponent
  },
  {
    path: 'detail/:matricule',
    component: DetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionRoutingModule { }
