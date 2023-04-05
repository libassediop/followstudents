import { Component, OnInit } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-alerte-note',
  templateUrl: './alerte-note.component.html',
  styleUrls: ['./alerte-note.component.scss']
})
export class AlerteNoteComponent implements OnInit {

  // bread crumb items
  breadCrumbItems: Array<{}>;
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
