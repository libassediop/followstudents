import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eleve',
  templateUrl: './eleve.component.html',
  styleUrls: ['./eleve.component.scss']
})
export class EleveComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  constructor() { }

  ngOnInit(): void {
  }

}
