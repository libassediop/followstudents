import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil/profil.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ProfilComponent
  ],
  imports: [
    CommonModule,
    ProfilRoutingModule,
    UIModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    NgbPaginationModule,
    NgSelectModule
  ]
})
export class ProfilModule { }
