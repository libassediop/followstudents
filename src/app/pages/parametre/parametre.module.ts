import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UIModule } from 'src/app/shared/ui/ui.module';
import { NgbNavModule, NgbPaginationModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ParametreComponent } from './parametre/parametre.component';
import { ParametreRoutingModule } from './parametre-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  declarations: [
    ParametreComponent
  ],
  imports: [
    CommonModule,
    ParametreRoutingModule,
    UIModule,
    NgbNavModule,
    FormsModule,
    ReactiveFormsModule,
    WidgetModule,
    NgbPaginationModule,
    NgSelectModule
  ]
})
export class ParametreModule { }
