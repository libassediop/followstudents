import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.scss']
})
export class ClasseComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  term:any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
