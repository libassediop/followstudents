import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesseurComponent } from './professeur/professeur.component';
import { ClasseEnseignerComponent } from './classe-enseigner/classe-enseigner.component';

const routes: Routes = [
  {
    path: 'professeur',
    component:ProfesseurComponent
  },
  {
    path: 'classeEnseigner/:id',
    component: ClasseEnseignerComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesseurRoutingModule { }
