import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DefaultComponent } from './dashboards/default/default.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => import('./dashboards/dashboards.module').then(m => m.DashboardsModule) },
  { path: 'alerte', loadChildren: () => import('./alerte/alerte.module').then(m => m.AlerteModule) },
  { path: 'inscription', loadChildren: () => import('./inscription/inscription.module').then(m => m.InscriptionModule) },
  { path: 'classe', loadChildren: () => import('./classe/classe.module').then(m => m.ClasseModule) },
  { path: 'professeur', loadChildren: () => import('./professeur/professeur.module').then(m => m.ProfesseurModule) },
  { path: 'personnel', loadChildren: () => import('./personnel/personnel.module').then(m => m.PersonnelModule) },
  { path: 'matiere', loadChildren: () => import('./matiere/matiere.module').then(m => m.MatiereModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
