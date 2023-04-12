import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClasseComponent } from './classe/classe.component';
import { ListeEleveParClasseComponent } from './liste-eleve-par-classe/liste-eleve-par-classe.component';
import { DetailsEleveComponent } from './details-eleve/details-eleve.component';

const routes: Routes = [
  {
    path: 'classe',
    component: ClasseComponent
  },
  {
    path: 'listeEleveParClasse',
    component: ListeEleveParClasseComponent
  },
  {
    path: 'detailsEleve',
    component: DetailsEleveComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasseRoutingModule { }
