import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-alerte-absence',
  templateUrl: './alerte-absence.component.html',
  styleUrls: ['./alerte-absence.component.scss']
})
export class AlerteAbsenceComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
  public Editor = ClassicEditor;
  transactions;
  term: any;
  constructor() { }

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Dashboards' }, { label: 'Saas', active: true }];

    this.transactions = [
      {
        id: '#1',
        nom: 'Diop',
        prenom: 'limamou',
        date: '12/02/1994',
        sexe: 'Masculin',
        telephone: 771922061,
      },
      {
        id: '2',
        nom: 'Ba',
        prenom: 'Malick',
        date: '02/01/2013',
        sexe: 'Masculin',
        telephone: 773714388,
      },
      {
        id: '3',
        nom: 'kane',
        prenom: 'Tiko',
        date: '21/05/1996',
        sexe: 'Masculin',
        telephone: 771768180,
      },
      {
        id: '4',
        nom: 'mbaye',
        prenom: 'aida',
        date: '02/01/2002',
        sexe: 'feminin',
        telephone: 77000000,
      }


    ];

  }


}
