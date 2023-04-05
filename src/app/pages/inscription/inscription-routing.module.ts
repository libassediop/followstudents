import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AlerteNoteComponent} from "../alerte/alerte-note/alerte-note.component";
import {AlerteAbsenceComponent} from "../alerte/alerte-absence/alerte-absence.component";
import {AlerteMessageComponent} from "../alerte/alerte-message/alerte-message.component";
import {EleveComponent} from "./eleve/eleve.component";

const routes: Routes = [
  {
    path: 'eleve',
    component: EleveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscriptionRoutingModule { }
