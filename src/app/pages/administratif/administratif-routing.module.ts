import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CertificatAbsenceComponent } from './certificat-absence/certificat-absence.component';
import { CertificatInscriptionComponent } from './certificat-inscription/certificat-inscription.component';
import { CertificatFrequentationComponent } from './certificat-frequentation/certificat-frequentation.component';

const routes: Routes = [
  {
    path: 'certificat-inscription',
    component: CertificatInscriptionComponent
  },
  {
    path: 'certificat-absence',
    component: CertificatAbsenceComponent
  },
  {
    path: 'certificat-frequentation',
    component: CertificatFrequentationComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministratifRoutingModule { }
