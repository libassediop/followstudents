import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DefaultComponent} from "../dashboards/default/default.component";
import {AlerteNoteComponent} from "./alerte-note/alerte-note.component";
import {AlerteAbsenceComponent} from "./alerte-absence/alerte-absence.component";
import {AlerteMessageComponent} from "./alerte-message/alerte-message.component";

const routes: Routes = [
  {
    path: 'alertenote',
    component: AlerteNoteComponent
  },
  {
    path: 'alerteabsence',
    component: AlerteAbsenceComponent
  },
  {
    path: 'alertemessage',
    component: AlerteMessageComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlerteRoutingModule { }
