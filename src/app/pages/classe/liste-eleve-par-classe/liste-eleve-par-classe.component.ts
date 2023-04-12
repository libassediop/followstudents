import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-eleve-par-classe',
  templateUrl: './liste-eleve-par-classe.component.html',
  styleUrls: ['./liste-eleve-par-classe.component.scss']
})
export class ListeEleveParClasseComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  term:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
