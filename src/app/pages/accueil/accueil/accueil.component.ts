import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartType } from './dashboard.model';
import { ConfigService } from 'src/app/core/services/config.service';
import { EventService } from 'src/app/core/services/event.service';
import { EleveService } from 'src/app/layouts/service/eleve.service';
import { ClasseService } from 'src/app/layouts/service/classe.service';
import {InscriptionreinscriptionService} from "../../../layouts/service/inscriptionreinscription.service";


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})

export class AccueilComponent implements OnInit {

  isVisible: string;

emailSentBarChart: ChartType;
monthlyEarningChart: ChartType;
transactions: Array<[]>;
classes;
  nonComplet;
// donutChart: ChartType;

isActive: string;
eleves;

@ViewChild('content') content;

  constructor(private eleveByClasseservice : EleveService,private serviceIns:InscriptionreinscriptionService, private serviceClasse : ClasseService, private modalService: NgbModal, private configService: ConfigService, private eventService: EventService) {
  }

  ngOnInit() {

    /**
     * horizontal-vertical layput set
     */
     const attribute = document.body.getAttribute('data-layout');
    this.nonComplet=localStorage.getItem('prenom') +' '+localStorage.getItem('nom')
     this.isVisible = attribute;
     const vertical = document.getElementById('layout-vertical');
     if (vertical != null) {
       vertical.setAttribute('checked', 'true');
     }
     if (attribute == 'horizontal') {
       const horizontal = document.getElementById('layout-horizontal');
       if (horizontal != null) {
         horizontal.setAttribute('checked', 'true');
       }
     }

     this.serviceIns.getStatClasseEleveProf().subscribe(
       (resp) => {
         this.statData[0].value = resp['nombreClasses'];
         this.statData[1].value = resp['nombreEleves'];
         this.statData[2].value = resp['nombreProfesseurs'];
       }
     )

     this.serviceClasse.getAllClasse().subscribe(
        (result)=>{
          this.classes=result
        },
        err =>{
          console.log(err)
        }
      );
     this.eleveByClasseservice.getAllEleveByClasse(this.eleves).subscribe((data: any) => {
        const nombreElevesParClasse = data.map((classe: any) => classe.eleves.length);
        this.nbrEleParCla.datasets[0].data = nombreElevesParClasse;

        const nomsClasses = data.map((classe: any) => classe.nom);
        this.nbrEleParCla.labels = nomsClasses;
    this.nbrEleParCla.datasets[0].data = nombreElevesParClasse;
      });

  }


   donutChart: ChartType = {
    chart: {
        height: 420,
        type: 'donut',
    },
    series: [ 55, 45],
    legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        verticalAlign: 'middle',
        floating: false,
        fontSize: '14px',
        offsetX: 0,
        offsetY: -10
    },
    labels: [' Filles', 'Garçons'],
    // ['#34c38f', '#556ee6', '#f46a6a', '#50a5f1', '#f1b44c'],
    colors: ['#f46a6a', '#556ee6'],
    responsive: [{
        breakpoint: 600,
        options: {
            chart: {
                height: 240
            },
            legend: {
                show: false
            },
        }
    }],
};


  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     this.openModal();
  //   }, 2000);
  // }

  statData = [
    {
      icon: 'bx bxs-school',
      title: 'Classes',
      value: '30',

    },
    {
      icon: 'bx bx-body',
      title: 'Élèves',
      value: '500'
    },
    {
      icon: 'bx bxs-user',
      title: 'Professeurs',
      value: '20'
    }
  ];

  repSexeParCla: ChartType = {
    chart: {
        height: 350,
        type: 'bar',
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: false,
            endingShape: 'rounded',
            columnWidth: '45%',
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
    },
    colors: [ '#556ee6', '#f46a6a'],
    series: [ {
        name: 'Garçons',
        data: [74, 83, 102, 97, 86, 106, 93, 114, 94]
    }, {
        name: 'Filles',
        data: [37, 42, 38, 26, 47, 50, 54, 55, 43]
    }],
    xaxis: {
        categories: [ 'cinquieme', 'sixieme','tle','seconde', 'premiere','quatrieme',  'cm2'],
    },
    yaxis: {
        title: {
            text: '$ (thousands)'
        }
    },
    fill: {
        opacity: 1
    },
    grid: {
        borderColor: '#f1f1f1'
    },

};

  nbrEleParCla: ChartType = {
    labels: [
        'cinquieme',
        'sixieme',
        'tle',
        'seconde',
        'premiere',
        'quatrieme',
        'cm2'
    ],
    datasets: [
        {
            label: 'Nombre élèves par classe',
            backgroundColor: 'rgba(52, 195, 143, 0.8)',
            borderColor: 'rgba(52, 195, 143, 0.8)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(52, 195, 143, 0.9)',
            hoverBorderColor: 'rgba(52, 195, 143, 0.9)',
            data: [65, 59, 81, 45, 56, 80, 50, 20],
            barPercentage: 0.4

        },
    ],
    options: {
        maintainAspectRatio: false,
        scales: {
            xAxes: [
                {
                    gridLines: {
                        color: 'rgba(166, 176, 207, 0.1)'
                    },
                }
            ],
            yAxes: [
                {
                    gridLines: {
                        color: 'rgba(166, 176, 207, 0.1)'
                    }
                }
            ]
        }
    }
};

nbreElveParAnn: ChartType = {
  chart: {
      height: 350,
      type: 'bar',
      toolbar: {
          show: false
      }
  },
  colors: ['#556ee6'],
  plotOptions: {
      bar: {
          dataLabels: {
              position: 'top', // top, center, bottom
          },
      }
  },
  dataLabels: {
      enabled: true,
      formatter: (val) => {
          return val + '';
      },
      offsetY: -20,
      style: {
          fontSize: '12px',
          colors: ['#304758']
      }
  },
  series: [{
      name: 'nbrEleves',
      data: [200, 210, 230, 245, 250, 270, 280, 282, 290, 292, 290, 300]
  }],
  xaxis: {
      categories: [, '2011', '2012', '2013', '2015', '2016','2017', '2018', '2019', '2020', '2021', '2022', '2023'],
      position: 'top',
      labels: {
          offsetY: -18,
      },
      axisBorder: {
          show: false
      },
      axisTicks: {
          show: false
      },
      crosshairs: {
          fill: {
              type: 'gradient',
              gradient: {
                  colorFrom: '#D8E3F0',
                  colorTo: '#BED1E6',
                  stops: [0, 100],
                  opacityFrom: 0.4,
                  opacityTo: 0.5,
              }
          }
      },
      tooltip: {
          enabled: true,
          offsetY: -35,
      }
  },
  fill: {
      gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
      },
  },
  yaxis: {
      axisBorder: {
          show: false
      },
      axisTicks: {
          show: false,
      },
      labels: {
          show: false,
          formatter: (val) => {
              return val + 'eleves';
          }
      }
  },
  title: {
      text: 'Monthly Inflation in Argentina, 2002',
      floating: true,
      offsetY: 320,
      align: 'center',
      style: {
          color: '#444'
      }
  },
};


  openModal() {
    this.modalService.open(this.content, { centered: true });
  }





  /**
   * Change the layout onclick
   * @param layout Change the layout
   */
   changeLayout(layout: string) {
    this.eventService.broadcast('changeLayout', layout);
  }

}
