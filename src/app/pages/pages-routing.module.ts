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
import { ClasseEnseignerComponent } from './professeur/classe-enseigner/classe-enseigner.component';
import { AccueilModule } from './accueil/accueil.module';
import { AdministratifModule } from './administratif/administratif.module';



const route: Routes = [

  { path: '', redirectTo: 'dashboard' },

  {path: 'administratif',loadChildren:() => AdministratifModule},
  { path: 'dashboard', component: DefaultComponent },
  { path: 'accueil', loadChildren: () => AccueilModule },
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

      { path: 'accueil',loadChildren: () =>  AccueilModule },
      {path: 'administratif',loadChildren:() => AdministratifModule},
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
