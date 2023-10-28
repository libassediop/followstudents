import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './dashboards/default/default.component';
import { AlerteModule } from './alerte/alerte.module';
import { ClasseModule } from './classe/classe.module';
import { InscriptionModule } from './inscription/inscription.module';
import { MatiereModule } from './matiere/matiere.module';
import { PersonnelModule } from './personnel/personnel.module';
import { ProfesseurModule } from './professeur/professeur.module';
import { LayoutComponent } from '../layouts/layout.component';
import { AccueilModule } from './accueil/accueil.module';
import { ParametreModule } from './parametre/parametre.module';
import { ProfilModule } from './profil/profil.module';



const route: Routes = [
    
  { path: '', redirectTo: 'dashboard' },
 
 
  { path: 'dashboard', component: DefaultComponent },
  { path: 'accueil', loadChildren: () => AccueilModule },
  { path: 'alerte', loadChildren: () => AlerteModule },
  { path: 'classe', loadChildren: () => ClasseModule },
  { path: 'inscription', loadChildren: () => InscriptionModule},
  { path: 'matiere', loadChildren: () => MatiereModule },
  { path: 'personnel', loadChildren: () => PersonnelModule },
  { path: 'professeur', loadChildren: () => ProfesseurModule },
  { path: 'parametre', loadChildren: () => ParametreModule },
  { path: 'profil', loadChildren: () => ProfilModule },
  
];
const routes: Routes = [{
    path: '',
    component: LayoutComponent,
    children: [
  // tslint:disable-next-line:no-trailing-whitespace

      { path: 'accueil',loadChildren: () =>  AccueilModule },
      { path: 'alerte', loadChildren: () => AlerteModule },
      { path: 'classe', loadChildren: () => ClasseModule },
      { path: 'inscription', loadChildren: () => InscriptionModule},
      { path: 'matiere', loadChildren: () => MatiereModule },
      { path: 'personnel', loadChildren: () => PersonnelModule },
      { path: 'professeur', loadChildren: () => ProfesseurModule },
      { path: 'parametre', loadChildren: () => ParametreModule },
      { path: 'profil', loadChildren: () => ProfilModule },
      { path: '', redirectTo: 'dashboards', pathMatch: 'full' },
      { path: '**', redirectTo: 'dashboards' },

    ],
  }];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
