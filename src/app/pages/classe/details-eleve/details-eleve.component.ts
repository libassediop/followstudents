import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details-eleve',
  templateUrl: './detailseleve.component.html',
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
    

  ];
  constructor() { }

  ngOnInit(): void {
  }

}
