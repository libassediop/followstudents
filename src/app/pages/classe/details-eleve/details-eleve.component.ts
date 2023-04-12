import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-eleve',
  templateUrl: './details-eleve.component.html',
  styleUrls: ['./details-eleve.component.scss']
})
export class DetailsEleveComponent implements OnInit {

  term:any;
  statData = [
    {
      icon: 'bx bxs-laugh',
      title: "Nbres d'absences",
      value: '10',
    },
    {
      icon: 'bx bxs-wink-smile',
      title: 'moyenne 1er semestre',
      value: '8'
    }, {
      icon: 'bx bxs-cool',
      title: 'moyenne 2nd semestre',
      value: '8,6'
    },

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
