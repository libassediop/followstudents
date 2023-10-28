import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratifRoutingModule } from './administratif-routing.module';
import { CertificatInscriptionComponent } from './certificat-inscription/certificat-inscription.component';
import { CertificatAbsenceComponent } from './certificat-absence/certificat-absence.component';
import { CertificatFrequentationComponent } from './certificat-frequentation/certificat-frequentation.component';


@NgModule({
  declarations: [
    CertificatInscriptionComponent,
    CertificatAbsenceComponent,
    CertificatFrequentationComponent
  ],
  imports: [
    CommonModule,
    AdministratifRoutingModule
  ]
})
export class AdministratifModule { }
