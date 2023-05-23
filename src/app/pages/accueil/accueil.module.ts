import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccueilRoutingModule } from './accueil-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { NgbDropdownModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from 'src/app/shared/shared.module';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ChartsModule }   from 'ng2-charts';
// import { NgxChartistModule } from 'ngx-chartist';



@NgModule({
  declarations: [
    AccueilComponent
  ],
  imports: [
    CommonModule,
    AccueilRoutingModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbNavModule,
    WidgetModule,
    NgApexchartsModule,
    SharedModule,
    SimplebarAngularModule,
    ChartsModule,
    // NgxChartistModule,
    // NgxEchartsModule

  ]
})
export class AccueilModule { }
