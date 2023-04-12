import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChartType } from 'ng-apexcharts';

@Component({
  selector: 'app-classe-enseigner',
  templateUrl: './classe-enseigner.component.html',
  styleUrls: ['./classe-enseigner.component.scss']
})
export class ClasseEnseignerComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  term: any;

  transactions;
  revenueBarChart: ChartType ;
  statData = [
    {
      icon: 'bx bxs-cool',
      title: 'Classes',
      value: '5',

    },
    {
      icon: 'bx bxs-wink-smile',
      title: 'Eleves',
      value: '300'
    }

  ];
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Contacts' }, { label: 'Profile', active: true }];
   
  }

    /**
   * Open modal
   * @param content modal content
   */
    openModalAffecterClasse(content) {
      this.modalService.open(content, {centered: true });
    }

}
