import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratifRoutingModule } from './administratif-routing.module';
import { CertificatInscriptionComponent } from './certificat-inscription/certificat-inscription.component';
import { CertificatAbsenceComponent } from './certificat-absence/certificat-absence.component';
import { CertificatFrequentationComponent } from './certificat-frequentation/certificat-frequentation.component';
import { UIModule } from "../../shared/ui/ui.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';


@NgModule({
    declarations: [
        CertificatInscriptionComponent,
        CertificatAbsenceComponent,
        CertificatFrequentationComponent
    ],
    imports: [
        AdministratifRoutingModule,
        CommonModule,
        UIModule,
        FormsModule,
        CKEditorModule,
        NgSelectModule,
        ReactiveFormsModule,
        NgbPaginationModule
    ]
})
export class AdministratifModule { }
