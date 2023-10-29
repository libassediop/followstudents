import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ClasseComponent} from "../classe/classe/classe.component";
import {ListeEleveParClasseComponent} from "../classe/liste-eleve-par-classe/liste-eleve-par-classe.component";
import {DetailsEleveComponent} from "../classe/details-eleve/details-eleve.component";
import {CaisseJournalireComponent} from "./caisse-journalire/caisse-journalire.component";

const routes: Routes = [
  {
    path: 'caisseJornalier',
    component: CaisseJournalireComponent
  },
  // {
  //   path: 'listeEleveParClasse/:id',
  //   component: ListeEleveParClasseComponent
  // },
  // {
  //   path: 'detailsEleve/:matricule',
  //   component: DetailsEleveComponent
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CaisseRoutingModule { }
