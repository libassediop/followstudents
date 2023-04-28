import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './dashboards/default/default.component';
import { DashboardsModule } from './dashboards/dashboards.module';
import { AlerteModule } from './alerte/alerte.module';
import { ClasseModule } from './classe/classe.module';
import { InscriptionModule } from './inscription/inscription.module';
import { MatiereModule } from './matiere/matiere.module';
import { PersonnelModule } from './personnel/personnel.module';
import { ProfesseurModule } from './professeur/professeur.module';
import { LayoutComponent } from '../layouts/layout.component';


const route: Routes = [
    
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DefaultComponent },
  { path: 'dashboards', loadChildren: () => DashboardsModule },
  { path: 'alerte', loadChildren: () => AlerteModule },
  { path: 'classe', loadChildren: () => ClasseModule },
  { path: 'inscription', loadChildren: () => InscriptionModule},
  { path: 'matiere', loadChildren: () => MatiereModule },
  { path: 'personnel', loadChildren: () => PersonnelModule },
  { path: 'professeur', loadChildren: () => ProfesseurModule },
  
  
];
const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
  // tslint:disable-next-line:no-trailing-whitespace
  
      {
        path: 'dashboards',
        loadChildren: () => import('./dashboards/dashboards.module')
          .then(m => m.DashboardsModule),
      },
      { path: 'alerte', loadChildren: () => AlerteModule },
    { path: 'classe', loadChildren: () => ClasseModule },
    { path: 'inscription', loadChildren: () => InscriptionModule},
    { path: 'matiere', loadChildren: () => MatiereModule },
    { path: 'personnel', loadChildren: () => PersonnelModule },
    { path: 'professeur', loadChildren: () => ProfesseurModule },
  
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboards' },
    ],
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
